/* By Ray Toal:
*  https://github.com/rtoal/iki-compiler
*/
const fs = require('fs');
const assert = require('assert');
const parse = require('./test-syntax-parser');
const TEST_DIR = 'test/data/syntax-errors';

const runSyntaxErrors = () => {
  /* eslint-disable no-undef */
  describe('The parser detects a syntax error for', () => {
    fs.readdirSync(TEST_DIR).forEach((name) => {
      const check = name.replace(/-/g, ' ').replace(/\.jen$/, '');
      it(check, (done) => {
        const sourceCode = fs.readFileSync(`${TEST_DIR}/${name}`, 'utf-8');
        assert.throws(() => parse(sourceCode));
        done();
      });
    });
  });
};

module.exports = () => {
  runSyntaxErrors();
};
