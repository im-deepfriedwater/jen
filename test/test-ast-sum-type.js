const parse = require('../syntax/parser');
const assert = require('assert');

// TODO Consider switching to Jest, but we would need to rename a few files
// and refactor a few as well.


// to debug failing tests, use     console.log(JSON.stringify(result));

const astCompare = (x, y) => JSON.stringify(x) === JSON.stringify(y);

// console.log(util.inspect(file, {showHidden: false, depth: null}));
/* eslint-disable no-undef */
describe('Sum Type', () => {
    const expected = {
        body: {
            statements: [
                {
                    id: "temp",
                    sumtype: "temp"
                },
            ],
        },
    };

    beforeEach(() => {
        // Clear out the test object before each run.
        expected.body.statements[0] = {
            id: "temp",
            sumtype: "temp"
        };
    });
    it('should correctly parse Sum Types', () => {
        expected.body.statements[0].id = 'testID';
        expected.body.statements[0].sumtype = { basicTypeOrId1: "int", basicTypeOrId2: "boolean", moreBasicTypesOrIds: [] };
        let result = parse('type testID int | boolean');
        assert.equal(astCompare(expected, result), true);

        expected.body.statements[0].id = 'testID2';
        expected.body.statements[0].sumtype = { basicTypeOrId1: "testType", basicTypeOrId2: "testType2", moreBasicTypesOrIds: ["testType3"] };
        result = parse('type testID2 testType | testType2 | testType3');
        assert.equal(astCompare(expected, result), true);

        expected.body.statements[0].id = 'testID3';
        expected.body.statements[0].sumtype = { basicTypeOrId1: "boolean", basicTypeOrId2: "string", moreBasicTypesOrIds: ["char", "number", "object", "any", "void", "error"] };
        result = parse('type testID3 boolean | string | char | number | object | any | void | error');
        assert.equal(astCompare(expected, result), true);
    });
});
