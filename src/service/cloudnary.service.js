
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

// Configure credentials (Use environment variables for security!)
cloudinary.config({
  cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});


export async function uploadToCloudinary(filePath) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'auto',
    });
    console.log("Cloudinary Upload Success:", result.secure_url);
    return result;
  } catch (error) {
    fs.unlinkSync(filePath);
    console.error("Cloudinary Upload Error:", error);
  }
}

// Optional: Export a URL generator for convenience
export function generateUrl(publicId, transformations = {}) {
    return cloudinary.url(publicId, transformations);
}