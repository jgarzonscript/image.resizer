import express from "express";
import reszr from "../utilities/imageUtil";

const apiRouter = express.Router();

apiRouter.get(
    "/",
    async (req: express.Request, res: express.Response): Promise<void> => {
        const image = String(req.query["image"]),
            width = String(req.query["width"]),
            height = String(req.query["height"]);

        try {
            const resizer = await reszr(image, width, height);
            res.set("Content-Approved", resizer.ready ? "OK" : "NOT OK");
            res.sendFile(resizer.thumb);
        } catch (error) {
            res.status(500).send(error.toString());
        }
    }
);

export default apiRouter;
