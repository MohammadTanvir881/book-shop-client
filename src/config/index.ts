import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  cloudinary_Name: process.env.CLOUDINARY_NAME,
};
