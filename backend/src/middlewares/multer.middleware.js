import multer from "multer";
import path from "path";

// Allowed file types
const allowedFileTypes = ["image/jpeg", "image/png", "image/gif"];

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});


// File filter to validate file types
const fileFilter = (req, file, cb) => {
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type!"), false);
  }
};

// Define Multer upload instance for single file (used in cases where only one file is uploaded)
export const uploadSingle = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
}).single("image"); // Single file upload

// Define Multer upload instance for multiple files (array of images)
export const uploadMultiple = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
}).array("images", 5); // Multiple files upload with a maximum of 5 files
