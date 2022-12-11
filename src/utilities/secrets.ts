import * as dotenv from "dotenv";

dotenv.config();

/**
 * @description folder where the images are stored
 */
export const IMAGES_FOLDER = process.env.IMAGES_FOLDER || "";
if (!IMAGES_FOLDER) {
    console.error("No images folder exists. Set IMAGES_FOLDER environment variable.");
    process.exit(1);
}

/**
 * @description folder where all log files are stored
 */
export const LOG_FOLDER = process.env.LOG_FOLDER || "";
if (!LOG_FOLDER) {
    console.error("No log folder exists. Set the following environment variable, LOG_FOLDER");
    process.exit(1);
}

export const ACCESS_LOG = process.env.ACCESS_LOG || "";
if (!ACCESS_LOG) {
    console.error("No file exists. Set the following environment variable, ACCESS_LOG");
    process.exit(1);
}
