// Borrowed from rtoal's test suite from iki!
// https://github.com/rtoal/iki-compiler

const fs = require('fs');
const parse = require('../parser');

const TEST_DIR = 'test/data/good-programs';

const runSyntaxTest = () => {
  console.log("hello");
  describe('The compiler', () => {
    fs.readdirSync(TEST_DIR).forEach((name) => {
      it(`should compile ${name} without errors`, (done) => {
        const program = parse(fs.readFileSync(`${TEST_DIR}/${name}`, 'utf-8'));
        done();
      });
    });
  });
};

module.exports = () => {
  runSyntaxTest();
};
