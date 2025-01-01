import dotenv from "dotenv";
import { app } from "./app.js"; // Import your express app
import connectDB from "./db/index.js";

// This will allow Vercel to handle the app as a serverless function
import { createServer } from "@vercel/node";

dotenv.config({ path: "./env" });

connectDB().then(() => {
  console.log(`Connected to database`);
  console.log(`Server is running at port ${process.env.PORT || 8000}`);
});

// This line ensures Vercel can properly handle the Express app in serverless mode
export default createServer(app);
