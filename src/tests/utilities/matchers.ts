import MatchersUtil = jasmine.MatchersUtil;
import CustomMatcherFactories = jasmine.CustomMatcherFactories;
import CustomEqualityTester = jasmine.CustomEqualityTester;
import CustomMatcher = jasmine.CustomMatcher;
import CustomMatcherResult = jasmine.CustomMatcherResult;

import { accessSync, constants } from "fs";

export const ImageUtilCustomMatchers: CustomMatcherFactories = {
    toExistInFS: function (
        util: MatchersUtil,
        customEqualityTester: ReadonlyArray<CustomEqualityTester>
    ): CustomMatcher {
        return {
            compare: function (
                actual: any,
                expected: any
            ): CustomMatcherResult {
                const result = { pass: false, message: "" };

                try {
                    accessSync(actual, constants.R_OK);
                    console.log("can read/write");
                    result.pass = true;
                } catch (err) {
                    console.error("no access!");
                    result.message = err.message;
                }

                return result;
            }
        };
    }
};
