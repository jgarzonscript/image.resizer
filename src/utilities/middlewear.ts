import express from "express";
import { BaseEncodingOptions } from "fs";
import { readdir, appendFile } from "fs/promises";
import { FsException } from "./exceptions";
import { IMAGES_FOLDER, ACCESS_LOG } from "./secrets";

/**
 * @description Middlewear private function
 * used by getListOfFiles()
 * generates the list of files available in directory /images
 * @returns {string[]}
 */
const getAllFiles = async (): Promise<string[]> => {
    const opts: BaseEncodingOptions & { withFileTypes: true } = { withFileTypes: true };

    try {
        const files = (await readdir(IMAGES_FOLDER, opts))
            .filter((item) => !item.isDirectory())
            .map((file) => file.name);
        await recordAccess("images were accessed for viewing.");
        return files;
    } catch (error) {
        throw new FsException(
            `error trying to read directory '${IMAGES_FOLDER}' \n ${(<Error>error).message}`,
            "getAllFiles Exception"
        );
    }
};

/**
 * @description basic logging to a file
 * @returns {void} void
 */
const recordAccess = async (msg: string): Promise<void> => {
    try {
        const time = new Date().toLocaleString("en-US"),
            content = `(${time}) ${msg}\n`;
        await appendFile(ACCESS_LOG, content);
    } catch (error) {
        const err = <Error>error;
        throw new FsException(`tried to log to file 🤦🏻‍♂️\n\n${err}`);
    }
};

/**
 * @description middlewear public function;
 * consumed by app.get("/"),
 * fills response object with client-facing data
 * @param {req} request
 * @param {res} response
 * @param {next} next
 * @returns {void}
 */
export const getListOfFiles = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<void> => {
    try {
        const files = await getAllFiles();
        res.locals.files = files;
        next();
    } catch (error: unknown) {
        console.log(error);
        res.locals.error = (error as FsException).message;
        next();
    }
};

const middlewear = {
    getListOfFiles
};

export default middlewear;
