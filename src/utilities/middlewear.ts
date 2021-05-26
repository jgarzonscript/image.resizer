import express from "express";
import { BaseEncodingOptions, Dirent, PathLike } from "fs";
import { readdir } from "fs/promises";
// import path from "path";

/**
 * @description Middlewear private function
 * used by getListOfFiles()
 * generates the list of files available in directory /images
 * @returns {string[]}
 */
const getAllFiles = async (
    dir = "./images",
    options: BaseEncodingOptions & { withFileTypes: true }
) => {
    try {
        const files = (await readdir(dir, options))
            .filter((item) => !item.isDirectory())
            .map((file) => file.name);
        return files;
    } catch (error) {
        throw new Error(error);
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
) => {
    try {
        res.locals.files = await getAllFiles("./images", {
            withFileTypes: true
        });
        next();
    } catch (error) {
        console.log(error);
        res.locals.error = error;
        next();
    }
};

const middlewear = {
    getListOfFiles
};

export default middlewear;
