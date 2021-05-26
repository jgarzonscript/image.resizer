import sharp from "sharp";
import path from "path";
import { access } from "fs/promises";
import { constants } from "fs";

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
const init_ImageFile = async (imageFile: string) => {
    try {
        const pathToFile = path.resolve("./images", imageFile);
        await access(pathToFile, constants.R_OK);
        return undefined;
    } catch (error) {
        throw new ImageException(
            `error accessing file ${imageFile};;\npossible it does not exist in stored location;;\n ${error.message}`,
            "init_ImageFile exception"
        );
    }
};

/**
 * @description validates parameters: width, height
 * @param width
 * @param height
 * @returns undefined
 */
const init = (width: string, height: string) => {
    try {
        const parsedWidth = parseInt(width);
        if (!isNaN(parsedWidth) && parsedWidth > 0) {
            _width = parsedWidth;
        } else {
            throw new ImageException("width is not correctly provided");
        }

        const parsedHeight = parseInt(height);
        if (!isNaN(parsedHeight) && parsedHeight > 0) {
            _height = parsedHeight;
        } else {
            throw new ImageException("height is not correctly provided");
        }

        return undefined;
    } catch (error) {
        (error as ImageException).name = "init exception";
        throw error;
    }
};

const test = () => {
    publicObject.test = "yo yo yo";
};

let _width = 0;
let _height = 0;

const publicObject: { ready: boolean; test: string; publicFunction: Function } =
    {
        ready: false,
        test: "abc",
        publicFunction: test
    };

export default async function resizer(
    imageFile: string,
    width: string,
    height: string
) {
    try {
        init(width, height);
        await init_ImageFile(imageFile);

        // TODO: create thumb folder if it does not exist then
        // -> check if imagefile already exists in thumb folder
        // -> if exists -> serve that and send file
        // -> if NOT exists -> continue to next step

        // TODO: consume the sharp class and do the conversion

        // TODO : go all the way, convert, send

        publicObject.ready = true;
        return publicObject;
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

    export async function resizerTester(options: resizerTesterOptions) {
        try {
            if (options.testType === TestType.WidthAndHeight) {
                init(String(options.width), String(options.height));
                publicObject.ready = true;
                return publicObject;
            }

            if (options.testType === TestType.ImageFileExist) {
                await init_ImageFile(String(options.imageFile));
                publicObject.ready = true;
                return publicObject;
            }
        } catch (error) {
            throw error;
        }
    }
}
