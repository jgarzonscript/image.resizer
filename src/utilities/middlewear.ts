import express from "express";
import { BaseEncodingOptions, Dirent, PathLike } from "fs";
import { readdir } from "fs/promises";
// import path from "path";

interface myread {
    (
        path: PathLike,
        options?:
            | (BaseEncodingOptions & { withFileTypes?: false })
            | BufferEncoding
            | null
    ): Promise<string[]>;
    (
        path: PathLike,
        options: { encoding: "buffer"; withFileTypes?: false } | "buffer"
    ): Promise<Buffer[]>;
    (
        path: PathLike,
        options?:
            | (BaseEncodingOptions & { withFileTypes?: false })
            | BufferEncoding
            | null
    ): Promise<string[] | Buffer[]>;
    (
        path: PathLike,
        options: BaseEncodingOptions & { withFileTypes: true }
    ): Promise<Dirent[]>;
}

const getAllFiles = async (
    read: myread,
    dir = "./images",
    options: BaseEncodingOptions & { withFileTypes: true }
) => {
    try {
        const result = await read(dir, options);
        const test = true;
    } catch (error) {
        //
    }
};

// const getFiles = async (files: Promise<Dirent[]>) => {
//     const result = await files;
//     const test = true;
// };

const getListOfFiles = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    getAllFiles(readdir, undefined, { withFileTypes: true });
};

const middlewear = {
    getListOfFiles
};

export default middlewear;
