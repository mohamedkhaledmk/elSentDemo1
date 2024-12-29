import asyncHandler from "express-async-handler";
import Image from "../models/image.model.js";
import {
  uploadOnCloudinary2,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";

const uploadImages = asyncHandler(async (req, res) => {
  try {
    const files = req?.files?.images; // `images` is the field name
    console.log("files", files);
    console.log("body", req.body);
    if (!files) {
      return res.status(400).json(new ApiResponse(400, "No files provided"));
    }

    const filesArray = Array.isArray(files) ? files : [files];

    const uploadedImages = await Promise.all(
      filesArray.map(async (file) => {
        console.log("result", file);
        const result = await uploadOnCloudinary(file.tempFilePath);
        const newImage = await Image.create({
          url: result.secure_url,
          public_id: result.public_id,
        });

        return newImage;
      })
    );

    res
      .status(201)
      .json(
        new ApiResponse(201, "Images uploaded successfully", uploadedImages)
      );
  } catch (error) {
    res.status(500).json(new ApiResponse(500, error.message || "Server error"));
  }
});

export { uploadImages };
