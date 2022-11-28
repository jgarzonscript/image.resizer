import express from "express";
import apiEndpoint from "./api";
import path from "path";
import ejs from "ejs";
import { getListOfFiles } from "./utilities/middlewear";
import morgan from "morgan";

// custom morgan token for date/time
morgan.token("datetime", function (_req, _res) {
    return new Date().toLocaleString();
});

const app = express();
const port = 3000;

app.engine(".html", ejs.renderFile);
app.set("views", path.resolve("./public"));

app.use("/api", apiEndpoint);
app.use("/static", express.static("public", { index: false }));
app.use("/images", express.static("images"));
app.use(morgan('(:datetime) ":method :url" :status :response-time ms'));

app.get("/", getListOfFiles, (req: express.Request, res: express.Response): void => {
    res.render("index.html", {});
});

app.listen(port, (): void => {
    const now = new Date().toLocaleString("en-US");
    console.log(`(${now}) server started listening at http://localhost:${port}`);
});

export default app;
