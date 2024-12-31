import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    });

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};
const uploadOnCloudinary2 = async (filePath) => {
  return cloudinary.v2.uploader.upload(filePath, {
    folder: "uploads", // Specify the folder in Cloudinary
  });
};

export { uploadOnCloudinary, uploadOnCloudinary2, cloudinary };
