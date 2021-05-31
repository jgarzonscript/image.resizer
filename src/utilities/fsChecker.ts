import path from "path";
import { access } from "fs/promises";
import { constants } from "fs";

// import { FsException } from "./exceptions";

const dims: [number, number] = [0, 0];

export interface thumbResponse {
    message?: string;
    error?: string;
    // thumb?: string;
}

/**
 * @param imageFile image file name
 * @param dimensions requested dimensions of width x height
 */
class FsChecker {
    private _imageFile: string;
    private _dimensions: typeof dims;
    private _thumb = "";
    private _newFileName = "";

    constructor(imageFile: string, dimensions: typeof dims) {
        this._imageFile = imageFile;
        this._dimensions = dimensions;
    }

    get thumb(): string {
        return this._thumb;
    }

    get newFileName(): string {
        return this._newFileName;
    }

    /**
     * @description confirms the image file exists as a thumb
     * @returns Promise of boolean
     */
    async thumbExists(respError?: thumbResponse): Promise<boolean> {
        let newFileName = "";

        try {
            newFileName = this.generateNewFileName();
            const pathToFile = path.resolve("./images/thumbs", newFileName);
            await access(pathToFile, constants.R_OK);
            this._thumb = pathToFile;
            return true;
        } catch (error) {
            if (respError) {
                respError.error = error.message;
                respError.message = `file [ ${newFileName} ] does not exist`;
            }
            this._newFileName = newFileName;
            return false;
        }
    }

    // TODO : add error handling try/catch
    /**
     * @description generates the image file name used for conversion
     * @returns string image file name
     */
    private generateNewFileName(): string {
        const fileExtension = path.extname(this._imageFile),
            rootName = path.basename(this._imageFile, fileExtension);

        const newFileName = [
            rootName,
            String(this._dimensions[0]),
            "x",
            String(this._dimensions[1]),
            fileExtension
        ].join("");

        return newFileName;
    }
}

export default FsChecker;
