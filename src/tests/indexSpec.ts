import supertest from "supertest";
import app from "../index";

const request = supertest(app);

describe("Main index page", () => {
    it("test root path/enpoint get request", async (done) => {
        const resp = await request.get("/");
        expect(resp).toBeTruthy();
        done();
    });
});
