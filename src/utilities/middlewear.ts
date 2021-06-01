import express from "express";
import { BaseEncodingOptions } from "fs";
import { readdir } from "fs/promises";
import { FsException } from "./exceptions";

/**
 * @description Middlewear private function
 * used by getListOfFiles()
 * generates the list of files available in directory /images
 * @returns {string[]}
 */
const getAllFiles = async (
    dir = "./images",
    options: BaseEncodingOptions & { withFileTypes: true }
): Promise<string[]> => {
    try {
        const files = (await readdir(dir, options))
            .filter((item) => !item.isDirectory())
            .map((file) => file.name);
        return files;
    } catch (error) {
        throw new FsException(
            `error trying to read directory ${dir} \n ${error.message}`,
            "getAllFiles Exception"
        );
    }
};

/**
 * @description middlewear public function;
 * consumed by app.get("/")
 * fills response object with client-facing data
 * @param {req} request object
 * @param {res} response object
 * @param {next} next object
 * @returns {void}
 */
const getListOfFiles = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<void> => {
    try {
        let files: string[] = [];
        files = await getAllFiles("./images", {
            withFileTypes: true
        });
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
