import express from "express";
import apiEndpoint from "./api";
import path from "path";
import ejs from "ejs";
import middlewear from "./utilities/middlewear";

const app = express();
const port = 3000;

app.engine(".html", ejs.renderFile);
app.set("views", __dirname);

app.use("/api", apiEndpoint);

//GET
app.get("/", (req, res) => {
    res.render("index.html", {
        mymessage: "hello world"
    });
});

app.listen(port, () => {
    console.log(`server started listening at http://localhost:${port}`);
});

export default app;
