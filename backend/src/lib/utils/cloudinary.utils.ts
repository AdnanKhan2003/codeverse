import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

import { API_KEY, API_SECRET, CLOUD_NAME } from "../../constants/env";

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const uploadOnCloudinary = async (localFilePath: string) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath);

    fs.unlinkSync(localFilePath);

    return response;
  } catch (err) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };
