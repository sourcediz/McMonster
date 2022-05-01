import { convertLetterToNumber, findNumbers } from "../utils/monsters/monsterGenerator";
import { convertThousands } from "../utils/monsters/units";

describe("findNumbers Function", () => {

test("Create an array with 1 number", () => {
    expect(findNumbers("as1vv")).toEqual([1]);
})

test("Create an array with 2 number", () => {
    expect(findNumbers("as1v1v")).toEqual([1,1]);
})

test("Given a string where 2 numbers are next to eachother should return 2 number array", () => {
    expect(findNumbers("as11v")).toEqual([1,1]);
})

test("String with special chars", () => {
    expect(findNumbers("as?/1'1#v")).toEqual([1,1]);
})

test("String with no numbers", () => {
    expect(findNumbers("asdasdasv")).toEqual([]);
})

test("Given a input not a string", () => {
    expect(findNumbers(true)).toEqual([]);
})

})

describe("convertLetterToNumber Function", () => {

    test("Convert a to 1", () => {
        expect(convertLetterToNumber("a")).toEqual(1);
    })
    
    test("Capital A converts to 1", () => {
        expect(convertLetterToNumber("A")).toEqual(1);
    })

    test("non letter convert to -1", () => {
        expect(convertLetterToNumber("5")).toEqual(0);
    })

    test("only takes one char -1", () => {
        expect(convertLetterToNumber("aa")).toEqual(0);
    })

    test("Given a input not a string", () => {
        expect(convertLetterToNumber(true)).toEqual(0);
    })
    })

    describe("convertThousands Function", () => {

        test("Convert 1000 to 1K", () => {
            expect(convertThousands(1000)).toEqual("1K");
        })

        test("Convert 1500 to 1.5K", () => {
            expect(convertThousands(1500)).toEqual("1.5K");
        })

        test("Convert 150000 to 150K", () => {
            expect(convertThousands(150000)).toEqual("150K");
        })

        test("Given a input not a number", () => {
            expect(convertThousands(true)).toEqual("");
        })

        test("Given a float", () => {
            expect(convertThousands(1500.00)).toEqual("1.5K");
        })
        })