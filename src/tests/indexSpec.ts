import supertest from "supertest";
import app from "../index";

const request = supertest(app);

describe("Main index page", () => {
    it("test root path/enpoint get request", async (done) => {
        request
            .get("/")
            .expect("content-type", /text\/html/)
            .expect(200, done);
    });
});
