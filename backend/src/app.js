import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import "./cronJobs.js";

const app = express();

// Middleware configuration
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static(path.join(process.cwd(), "public")));
app.use(cookieParser());

// File upload configuration using Multer
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(process.cwd(), "public", "uploads");
      cb(null, uploadPath); // Upload files to public/uploads
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Ensure unique filenames
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit files to 10MB
});

app.use((req, res, next) => {
  req.upload = upload;
  next();
});

// Routes import
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

// Route declarations
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
app.use("/api/v1/live", liveRouter);
app.use("/api/v1/paymob", paymobRouter);
app.use("/api/v1/contact", contactRouter);

// Temporary file handling for express-fileupload (optional)
import fileUpload from "express-fileupload";
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/", // Temporary file directory
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
  })
);

// Example endpoint for file uploads
app.post("/api/v1/upload", (req, res) => {
  req.upload.single("file")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(200).json({ message: "File uploaded successfully!", file: req.file });
  });
});

export { app };
