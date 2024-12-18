import cloudinary from "cloudinary";


export const cloudinaryConfig = cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
  });

export default cloudinary