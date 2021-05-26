import express from "express";
import { access } from "fs/promises";
import path from "path";
import { constants, read } from "fs";
import Resizer from "../utilities/imageUtil";

const apiRouter = express.Router();

apiRouter.get("/", async (req, res) => {
    const image = String(req.query["image"]),
        width = String(req.query["width"]),
        height = String(req.query["height"]);

    //TODO: use the sharp utility

    try {
        // const resizer = await Resizer(image, width, height);

        // if (resizer.ready) {
        //     // add custom header to indicate front-end everything is good
        // }

        // res.sendFile(resizer.imagefile); // TODO implement this process
        res.send("OK");
    } catch (error) {
        res.status(500).send(error.toString());
    }
    // fs.promise
    // const imageFile = path.resolve("./images", image as string);
    // try {
    //     const resp = await access(imageFile, constants.F_OK);
    //     console.log("file access true");
    //     res.sendFile(imageFile);
    //     // res.redirect(imageFile);
    // } catch (error) {
    //     console.error("cannot access");
    // }

    // res.send("OK"); //TODO: send [cropped] image file instead of text
});

export default apiRouter;
