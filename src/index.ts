import express from "express";
import apiEndpoint from "./api";

const app = express();
const port = 3000;

app.use("/api", apiEndpoint);

app.listen(port, () => {
    console.log(`server started listening at http://localhost:${port}`);
});
