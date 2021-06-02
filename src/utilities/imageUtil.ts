import sharp from "sharp";
import path from "path";
import { access } from "fs/promises";
import { constants } from "fs";

import FsChecker from "./fsChecker";

class ImageException extends Error {
    message: string;
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

export interface response {
    ready: boolean;
    thumb: string;
}

// const Dimensions: [number, number] = [0, 0];

/**
 * @description resizes an image using the sharp utility
 * @returns {string} file name of converted image
 */
const resizeImage = async (
    imageFile: string,
    newFileName: string,
    dims: [number, number]
): Promise<string> => {
    try {
        const pathToImage = path.resolve("./images", imageFile),
            pathToConverted = path.resolve("./images/thumbs", newFileName);

        const infoObject = await sharp(pathToImage)
            .resize(dims[0], dims[1], {
                kernel: sharp.kernel.nearest,
                fit: "contain"
            })
            .toFile(pathToConverted);
        return pathToConverted;
    } catch (error) {
        throw new ImageException(
            `error trying to resize image [ ${imageFile} ] using sharp module\n${error.message}`,
            "resizeImage Exception"
        );
    }
};

/**
 * @description validates the image file exists in folder ./images
 * @param imageFile image file name
 * @returns {undefined} undefined if successful;
 */
const validateImage = async (imageFile: string): Promise<undefined> => {
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
 * @returns {[number,number]} tuple [number, number]
 */
const parseDimensions = (width: string, height: string): [number, number] => {
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

/**
 *
 * @param imageFile image file name
 * @param width width size
 * @param height height size
 * @returns resizer.response
 */
export default async function resizer(
    imageFile: string,
    width: string,
    height: string
): Promise<response> {
    let dimensions: [number, number] = [0, 0],
        newFileName = "",
        thumb = "";

    dimensions = parseDimensions(width, height);

    await validateImage(imageFile);

    const checker = new FsChecker(imageFile, dimensions);
    if (await checker.thumbExists()) {
        resObject.thumb = checker.thumb;
        resObject.ready = true;
        return resObject;
    }

    newFileName = checker.newFileName;

    thumb = await resizeImage(imageFile, newFileName, dimensions);

    resObject.thumb = thumb;
    resObject.ready = true;
    return resObject;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
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
    }
}
