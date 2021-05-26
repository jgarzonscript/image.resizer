import { Tester } from "../../utilities/imageUtil";

const IMG_FILE_1 = "encenadaport.jpg";
const IMG_FILE_2 = "fjord.jpg";
const IMG_FILE_3 = "icelandwaterfall.jpg";
const IMG_FILE_4 = "palmtunnel.jpg";
const IMG_FILE_5 = "santamonica.jpg";
const IMG_FILE_DOES_NOT_EXIST = "foobar.jpg";

describe("Testing resizer class", () => {
    describe("Testing initialization phase", () => {
        const options: Tester.resizerTesterOptions = {
            height: "",
            width: "",
            testType: Tester.TestType.None
        };

        describe("Testing init of parameters: width and height", () => {
            afterEach(() => {
                options.height = "0";
                options.width = "0";
                options.testType = Tester.TestType.None;
            });

            it("should pass truthy with defined width and height parameters", async () => {
                options.width = "200";
                options.height = "300";
                options.testType = Tester.TestType.WidthAndHeight;

                const object = await Tester.resizerTester(options);
                expect(object).toBeDefined();
                expect(object?.ready).toBeTrue();
            });

            it("should fail when parameter width is empty", async () => {
                options.width = "0";
                options.height = "300";
                options.testType = Tester.TestType.WidthAndHeight;

                await expectAsync(
                    Tester.resizerTester(options)
                ).toBeRejectedWithError("width is not correctly provided");
            });

            it("should fail when parameter height is empty", async () => {
                options.width = "200";
                options.height = "0";
                options.testType = Tester.TestType.WidthAndHeight;

                await expectAsync(
                    Tester.resizerTester(options)
                ).toBeRejectedWithError("height is not correctly provided");
            });
        });

        describe("Testing init of image files", () => {
            describe("Testing image files exist", () => {
                afterEach(() => {
                    options.imageFile = "";
                    options.testType = Tester.TestType.None;
                });

                it(`should confirm the image file [ ${IMG_FILE_1} ] exists in the filesystem`, async () => {
                    options.testType = Tester.TestType.ImageFileExist;
                    options.imageFile = IMG_FILE_1;

                    const object = await Tester.resizerTester(options);
                    expect(object).toBeDefined();
                    expect(object?.ready).toBeTrue();
                });

                it(`should confirm the image file [ ${IMG_FILE_2} ] exists in the filesystem`, async () => {
                    options.testType = Tester.TestType.ImageFileExist;
                    options.imageFile = IMG_FILE_2;

                    const object = await Tester.resizerTester(options);
                    expect(object).toBeDefined();
                    expect(object?.ready).toBeTrue();
                });

                it(`should confirm the image file [ ${IMG_FILE_3} ] exists in the filesystem`, async () => {
                    options.testType = Tester.TestType.ImageFileExist;
                    options.imageFile = IMG_FILE_3;

                    const object = await Tester.resizerTester(options);
                    expect(object).toBeDefined();
                    expect(object?.ready).toBeTrue();
                });

                it(`should confirm the image file [ ${IMG_FILE_4} ] exists in the filesystem`, async () => {
                    options.testType = Tester.TestType.ImageFileExist;
                    options.imageFile = IMG_FILE_4;

                    const object = await Tester.resizerTester(options);
                    expect(object).toBeDefined();
                    expect(object?.ready).toBeTrue();
                });

                it(`should confirm the image file [ ${IMG_FILE_5} ] exists in the filesystem`, async () => {
                    options.testType = Tester.TestType.ImageFileExist;
                    options.imageFile = IMG_FILE_5;

                    const object = await Tester.resizerTester(options);
                    expect(object).toBeDefined();
                    expect(object?.ready).toBeTrue();
                });
            });

            describe("Testing image file does NOT exist", () => {
                it(`should confirm the image file [ ${IMG_FILE_DOES_NOT_EXIST} ] does NOT exist in filesystem`, async () => {
                    options.testType = Tester.TestType.ImageFileExist;
                    options.imageFile = IMG_FILE_DOES_NOT_EXIST;

                    await expectAsync(
                        Tester.resizerTester(options)
                    ).toBeRejectedWithError(/ENOENT: no such file/);
                });
            });
        });
    });
});
