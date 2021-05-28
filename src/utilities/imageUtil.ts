import sharp from "sharp";
import path from "path";
import { access } from "fs/promises";
import { constants } from "fs";

import FsChecker from "./fsChecker";

class ImageException extends Error {
    message: any;
    name: string;

    constructor(message: string, name?: string) {
        super(message);
        this.message = message;
        this.name = name ? name : "";
        this.stack = (<any>new Error()).stack;
    }

    toString() {
        return this.name + ", " + this.message;
    }
}

type Fn = () => void;

export interface response {
    ready: boolean;
    thumb: string;
}

// const Dimensions: [number, number] = [0, 0];

/**
 * @description resizes an image
 * @returns // TODO
 */
const resizeImage = async (
    imagefile: string,
    height: number,
    width: number
) => {
    // validate file
    // check if it exists in 'thumb' folder
    // if yes -> skip sharp and serve this file
    // if no -> continue with sharp process
    //
    //
    // const result = sharp(imagefile).resize(width, height).toFile();
};

/**
 * @description validates the image file exists in folder ./images
 * @param imageFile image file name
 * @returns undefined if successful;
 */
const validateImage = async (imageFile: string) => {
    try {
        const pathToFile = path.resolve("./images", imageFile);
        await access(pathToFile, constants.R_OK);
        return undefined;
    } catch (error) {
        throw new ImageException(
            `error accessing file ${imageFile};;\npossible it does not exist in stored location;;\n ${error.message}`,
            "validateImage exception"
        );
    }
};

/**
 * @description validates parameters: width, height
 * @param width
 * @param height
 * @returns undefined
 */
const parseDimensions = (width: string, height: string) => {
    let _width = 0,
        _height = 0;

    try {
        const parsedWidth = parseInt(width);
        if (!isNaN(parsedWidth) && parsedWidth > 0) {
            const roundedWidth = Math.round(parsedWidth / 100) * 100;
            _width = roundedWidth < 100 ? 100 : roundedWidth;
        } else {
            throw new ImageException("width is not correctly provided");
        }

        const parsedHeight = parseInt(height);
        if (!isNaN(parsedHeight) && parsedHeight > 0) {
            const roundedHeight = Math.round(parsedHeight / 100) * 100;
            _height = roundedHeight < 100 ? 100 : roundedHeight;
        } else {
            throw new ImageException("height is not correctly provided");
        }

        const dimensions: [number, number] = [_width, _height];
        return dimensions;
    } catch (error) {
        (error as ImageException).name = "init exception";
        throw error;
    }
};

const resObject: response = {
    ready: false,
    thumb: ""
};

export default async function resizer(
    imageFile: string,
    width: string,
    height: string
) {
    try {
        let dimensions: [number, number] = [0, 0],
            pathToImageFile = "",
            newFileName = "";

        dimensions = parseDimensions(width, height);
        await validateImage(imageFile);

        const checker = new FsChecker(imageFile, dimensions);
        if (checker.thumbExists()) {
            resObject.thumb = checker.thumb;
            resObject.ready = true;
            return resObject;
        }

        newFileName = checker.newFileName;

        // fsChecker.resize(newFileName)

        // 1. generate new filename from imageFile, width, and height; use path.join and see website
        // 2. create thumb folder inside '/images' , we'll assume it is always there
        // 3. check if new filename exists in thumb folder
        // 4. if exists, send that file
        // 5. if NOT exists, continue to next step (IE: use sharp)

        // TODO: create thumb folder if it does not exist then
        // -> check if imagefile already exists in thumb folder
        // -> if exists -> serve that and send file
        // -> if NOT exists -> continue to next step

        // TODO: consume the sharp class and do the conversion

        // TODO : go all the way, convert, send

        resObject.ready = true;
        return resObject;
    } catch (error) {
        throw error;
    }
}

export namespace Tester {
    export enum TestType {
        None = 0,
        WidthAndHeight,
        ImageFileExist
    }

    export interface resizerTesterOptions {
        width?: string;
        height?: string;
        testType: TestType;
        imageFile?: string;
    }

    export interface TesterResponse extends response {
        dims: [number, number];
    }

    const testerRespObject: TesterResponse = {
        ready: false,
        thumb: "",
        dims: [0, 0]
    };

    export async function resizerTester(
        options: resizerTesterOptions
    ): Promise<TesterResponse | undefined> {
        try {
            if (options.testType === TestType.None) {
                return testerRespObject;
            }

            if (options.testType === TestType.WidthAndHeight) {
                const dims = parseDimensions(
                    String(options.width),
                    String(options.height)
                );

                testerRespObject.dims = dims;
                testerRespObject.ready = true;
                return testerRespObject;
            }

            if (options.testType === TestType.ImageFileExist) {
                await validateImage(String(options.imageFile));
                testerRespObject.ready = true;
                return testerRespObject;
            }
        } catch (error) {
            throw error;
        }
    }
}
