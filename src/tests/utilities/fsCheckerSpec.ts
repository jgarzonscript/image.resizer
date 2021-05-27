import FsChecker, { thumbResponse } from "../../utilities/fsChecker";
import path from "path";

const IMG_FILE = "santamonica.jpg";
const dims: [number, number] = [0, 0];

describe("Testing the Class FsChecker", () => {
    describe("Testing functionality of method thumbExists()", () => {
        it("should return true for image file exist", async () => {
            const mydims: typeof dims = [400, 500],
                checker = new FsChecker(IMG_FILE, mydims);

            await expectAsync(checker.thumbExists()).toBeResolvedTo(true);

            const extension = path.extname(IMG_FILE),
                rootName = path.basename(IMG_FILE, extension);
            expect(checker.thumb).toBeTruthy();
            expect(checker.thumb).toMatch(rootName);
        });

        it("should fail as image does not exist", async () => {
            const IMG_NO_EXIST = "foobar.jpg",
                mydims: typeof dims = [400, 500],
                checker = new FsChecker(IMG_NO_EXIST, mydims);

            const response: thumbResponse = {};
            await expectAsync(checker.thumbExists(response)).toBeResolvedTo(
                false
            );
            expect(response.message).toBeTruthy();
            expect(response.error).toBeTruthy();
        });
    });

    // xit("should validate function generateNewFileName()", () => {
    //     const mydims: typeof dims = [400, 500],
    //         checker = new FsChecker(IMG_FILE, mydims);
    //     const newFileNameString = checker.generateNewFileName();
    //     expect(newFileNameString).toBeDefined();
    //     expect(newFileNameString).toEqual("santamonica400x500.jpg");
    // });
});
