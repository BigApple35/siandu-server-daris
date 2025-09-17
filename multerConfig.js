// ./middleware/multerConfig.js

import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import "dotenv/config.js";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "siandu-profile-pics", // Cloudinary folder name
    allowed_formats: ["jpg", "jpeg", "png", "gif"], // allowed formats
    public_id: (req, file) => `kader-${Date.now()}`, // filename pattern
  },
});

const upload = multer({ storage });

export const uploadPhoto = upload.single("photo");

export default upload;
