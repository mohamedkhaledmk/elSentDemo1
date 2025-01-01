import dotenv from "dotenv";
import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import cron from "node-cron";
import xss from "xss-clean";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import { init as io } from "./utils/socket.js"; // Import your Socket.IO setup
import { fetchAndStoreMetalPricesCron } from "./controllers/metalPrice.controller.js"; // Import cron job controller
import connectDB from "./db/index.js"; // Import DB connection logic

import userRouter from "./routes/user.routes.js";
import productCategoryRouter from "./routes/productCategory.routes.js";
import auctionRouter from "./routes/auction.routes.js";
import cityRouter from "./routes/city.routes.js";
import bidRouter from "./routes/bid.routes.js";
import notificationRouter from "./routes/notification.routes.js";
import paymentRouter from "./routes/payment.routes.js";
import cartRouter from "./routes/cart.routes.js";
import metalsRouter from "./routes/metalPrice.routes.js";
import liveRouter from "./routes/live.routes.js";
import paymobRouter from "./routes/paymob.routes.js";
import verifyRouter from "./routes/emailverification.routes.js";
import voucherRouter from "./routes/voucher.routes.js";
import imageRouter from "./routes/image.routes.js";
import contactRouter from "./routes/contact.routes.js";

const app = express();

// Middleware Setup
app.use(helmet());
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static(path.join(process.cwd(), "public")));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());

// Rate limiting setup
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests. Please try again later.",
});
app.use("/api", limiter);

// File upload configuration using Multer
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(process.cwd(), "public", "uploads");
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit for uploads
});

app.use((req, res, next) => {
  req.upload = upload;
  next();
});

// Cron job to fetch metal prices
cron.schedule("0 6 * * *", async () => {
  console.log("Cron job started: Fetching metal prices...");
  await fetchAndStoreMetalPricesCron();
  console.log("Cron job completed: Metal prices fetched and stored.");
});

// API Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/images", imageRouter);
app.use("/api/v1/product-categories", productCategoryRouter);
app.use("/api/v1/auctions", auctionRouter);
app.use("/api/v1/cities", cityRouter);
app.use("/api/v1/bids", bidRouter);
app.use("/api/v1/notifications", notificationRouter);
app.use("/api/v1/payments", paymentRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/verify-email", verifyRouter);
app.use("/api/v1/vouchers", voucherRouter);
app.use("/api/v1/metals", metalsRouter);
app.use("/api/v1/metals/fetch", metalsRouter);
app.use(`/api/v1/live`, liveRouter);
app.use(`/api/v1/paymob`, paymobRouter);
app.use(`/api/v1/contact`, contactRouter);

// Initialize Express app
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Setup environment and DB connection
dotenv.config({ path: "./env" });

connectDB().then(() => {
  console.log("Connected to the database");
  const server = http.createServer(app);

  // Socket.IO setup
  const ioInstance = io(server);
  ioInstance.on("connection", (socket) => {
    console.log("Socket is connected!");
  });

  // Start server
  server.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running at port ${process.env.PORT || 8000}`);
  });
});

export { app };
