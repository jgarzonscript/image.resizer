import express from "express";
import { BaseEncodingOptions, Dirent, PathLike } from "fs";
import { readdir } from "fs/promises";
// import path from "path";

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
