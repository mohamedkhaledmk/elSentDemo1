import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import cron from "node-cron";
import metalPriceRoutes from './routes/metalPrice.routes.js';
import { fetchAndStoreMetalPricesCron } from './controllers/metalPrice.controller.js';

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use('/api/v1', metalPriceRoutes);

cron.schedule('34 4 * * *', async () => {
  console.log('Cron job started: Fetching metal prices...');
  await fetchAndStoreMetalPricesCron();
  console.log('Cron job completed: Metal prices fetched and stored.');
});

// routes import
import userRouter from "./routes/user.routes.js";
import productCategoryRouter from "./routes/productCategory.routes.js";
import auctionRouter from "./routes/auction.routes.js";
import cityRouter from "./routes/city.routes.js";
import bidRouter from "./routes/bid.routes.js";
import notificationRouter from "./routes/notification.routes.js";
import paymentRouter from "./routes/payment.routes.js";
import cartRouter from "./routes/cart.routes.js";

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/product-categories", productCategoryRouter);
app.use("/api/v1/auctions", auctionRouter);
app.use("/api/v1/cities", cityRouter);
app.use("/api/v1/bids", bidRouter);
app.use("/api/v1/notifications", notificationRouter);
app.use("/api/v1/payments", paymentRouter);
app.use("/api/v1/cart", cartRouter);

export { app };