import dotenv from "dotenv";
import { app } from "./src/app.js";
import connectDB from "./src/db/index.js";
import http from "http";
import { init as io } from "./src/utils/socket.js";

const server = http.createServer(app);

const ioInstance = io(server);
ioInstance.on("connection", (socket) => {
  console.log("Socket is connected!");
});

process;
dotenv.config({
  path: "./env",
});

connectDB().then(
  server.listen(process.env.PORT || 8000, () => {
    console.log(`server is running at port ${process.env.PORT}`);
  })
);

export { io, server };
