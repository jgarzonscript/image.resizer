import express from "express";
import { access } from "fs/promises";
import path from "path";
import { constants, read } from "fs";
import reszr from "../utilities/imageUtil";

const apiRouter = express.Router();

apiRouter.get("/", async (req, res) => {
    const image = String(req.query["image"]),
        width = String(req.query["width"]),
        height = String(req.query["height"]);

    try {
        const resizer = await reszr(image, width, height);
        res.set("Content-Approved", resizer.ready ? "OK" : "NOT OK");
        res.sendFile(resizer.thumb);
        return;
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

export default apiRouter;
