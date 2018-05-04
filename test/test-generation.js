/*
 * Code Generation Tests
 *
 * Credit to @rtoal
 * https://github.com/rtoal/plainscript/blob/master/test/analyzer/analyzer-test.js
 *
 */
require('../backend/python-generator');
const fs = require('fs');
const assert = require('assert');
const parse = require('../syntax/parser');
const PYTHON_BRIDGE = require('python-bridge');

const JEN_PROGRAMS_DIR = 'test/data/code-generation/jen-programs';
const PYTHON_PROGRAMS_DIR = 'test/data/code-generation/python-programs';

const pythonResults = [];

describe('Code Generation', () => {
  fs.readdirSync(PYTHON_PROGRAMS_DIR).forEach((name) => {
    PYTHON_BRIDGE(fs.readFileSync(`${PYTHON_PROGRAMS_DIR}/${name}`, 'utf-8')).then((x) => {
      pythonResults.append(x);
    });
  });

  fs.readdirSync(JEN_PROGRAMS_DIR).forEach((name) => {
    it(`should analyze ${name} without errors`, () => {
      const program = parse(fs.readFileSync(`${JEN_PROGRAMS_DIR}/${name}`, 'utf-8')).gen();
      assert.equal(pythonResults[0], program);
      pythonResults.splice(0, 1);
    });
  });
});
