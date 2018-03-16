// Borrowed from rtoal's test suite from iki!
// https://github.com/rtoal/iki-compiler

const fs = require('fs');
const parse = require('./test-syntax-parser');

const TEST_DIR = 'test/data/good-programs';

const runSyntaxTest = () => {
  /* eslint-disable no-undef */
  describe('The compiler', () => {
    fs.readdirSync(TEST_DIR).forEach((name) => {
      it(`should parse syntax for ${name} without errors`, (done) => {
        parse(fs.readFileSync(`${TEST_DIR}/${name}`, 'utf-8'));
        done();
      });
    });
  });
};

module.exports = () => {
  runSyntaxTest();
};
