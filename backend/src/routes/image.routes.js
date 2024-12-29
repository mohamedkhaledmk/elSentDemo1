import { Router } from "express";
import {
  deleteImage,
  getImages,
  uploadImages,
} from "../controllers/image.controller.js"; // Import the new controller
import { uploadMultiple } from "../middlewares/multer.middleware.js"; // Middleware for handling multiple file uploads
import Image from "../models/image.model.js";
const router = Router();

// Route for uploading images
router.route("/").post(
  //   uploadMultiple, // Use upload.array() for multiple files upload
  uploadImages
);

router.route("/").get(getImages);
router.route(`/:id`).delete(deleteImage);

export default router;
