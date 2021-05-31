import reszr, { Tester } from "../../utilities/imageUtil";
import path from "path";

import { ImageUtilCustomMatchers } from "./matchers";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace jasmine {
        interface Matchers<T> {
            toExistInFS(expected: any, expectationFailOutput?: any): boolean;
            // toBeFirstNameEqualTo(expected: any, expectationFailOutput?: any): boolean;
            // toBeLastNameEqualTo(expected: any, expectationFailOutput?: any): boolean;
        }
    }
}

const IMG_FILE_1 = "encenadaport.jpg";
const IMG_FILE_2 = "fjord.jpg";
const IMG_FILE_3 = "icelandwaterfall.jpg";
const IMG_FILE_4 = "palmtunnel.jpg";
const IMG_FILE_5 = "santamonica.jpg";
const IMG_FILE_DOES_NOT_EXIST = "foobar.jpg";

describe("Testing resizer class", () => {
    describe("Testing individual phases", () => {
        const options: Tester.resizerTesterOptions = {
            height: "",
            width: "",
            testType: Tester.TestType.None
        };

        describe("Test of publicObject", () => {
            it("should allow accessing public object", async () => {
                const object = await Tester.resizerTester(options);
                expect(object?.ready).toBeFalse();
            });
        });

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
                expect(object?.dims).toEqual([200, 300]);
            });

            it("should return a tuple of [500, 200]", async () => {
                options.width = "540";
                options.height = "180";
                options.testType = Tester.TestType.WidthAndHeight;

                const object = await Tester.resizerTester(options);
                expect(object).toBeDefined();
                expect(object?.dims).toEqual([500, 200]);
            });

            it("should return a tuple of [100, 100]", async () => {
                options.width = "25";
                options.height = "10";
                options.testType = Tester.TestType.WidthAndHeight;

                const object = await Tester.resizerTester(options);
                expect(object).toBeDefined();
                expect(object?.dims).toEqual([100, 100]);
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

    describe("Testing full class resizer", () => {
        const config = {
            imageFile: "",
            width: "",
            height: ""
        };

        beforeEach(() => {
            jasmine.addMatchers(ImageUtilCustomMatchers);
        });

        afterEach(() => {
            config.imageFile = "";
            config.width = "";
            config.height = "";
        });

        it(`should resize file [ ${IMG_FILE_1} ] `, async () => {
            config.imageFile = IMG_FILE_1;
            config.width = "600";
            config.height = "800";

            const fileExtension = path.extname(config.imageFile),
                rootName = path.basename(config.imageFile, fileExtension);

            const response = await reszr(
                config.imageFile,
                config.width,
                config.height
            );

            expect(response.ready).toBeTrue();
            expect(response.thumb).toBeDefined();
            expect(response.thumb).toMatch(rootName);
            expect(response.thumb).toExistInFS(null);
        });
    });
});
