import * as dotenv from "dotenv";

dotenv.config();

export const IMAGES_FOLDER = process.env.IMAGES_FOLDER || "";

if (!IMAGES_FOLDER) {
    console.error("No images folder exists. Set IMAGES_FOLDER environment variable.");
    process.exit(1);
}
