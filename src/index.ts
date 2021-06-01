import express from "express";
import apiEndpoint from "./api";
import path from "path";
import ejs from "ejs";
import middlewear from "./utilities/middlewear";

const app = express();
const port = 3000;

app.engine(".html", ejs.renderFile);
app.set("views", path.resolve("./public"));

app.use("/api", apiEndpoint);
app.use("/static", express.static("public", { index: false }));
app.use("/images", express.static("images"));

//GET
app.get("/", middlewear.getListOfFiles, (req, res) => {
    const options: renderObject = {
        errormessage: res.locals.error as string,
        files: res.locals.files as string[]
    };

    res.render("index.html", options);
});

app.listen(port, () => {
    console.log(`server started listening at http://localhost:${port}`);
});

export default app;

interface renderObject {
    errormessage: string;
    files: string[];
}
