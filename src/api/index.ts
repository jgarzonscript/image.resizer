import express from "express";

const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
    res.send("welcome to the /api endpoint;");
});

export default apiRouter;
