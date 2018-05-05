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
const intercept = require('intercept-stdout');
const shell = require('shelljs');

const JEN_PROGRAMS_DIR = 'test/data/code-generation/jen-programs';
const PYTHON_PROGRAMS_DIR = 'test/data/code-generation/python-programs';

describe('Code Generation', () => {
  fs.readdirSync(JEN_PROGRAMS_DIR).forEach((name) => {
    it(`should analyze ${name} without errors`, () => {
      const program = parse(fs.readFileSync(`${JEN_PROGRAMS_DIR}/${name}`, 'utf-8'));
      program.analyze();
      const buffer = [];
      const unhookIntercept = intercept((text) => {
        buffer.push(text);
        return '';
      });
      program.gen();
      unhookIntercept();
      const jenCode = buffer.join('');
      const jenCodeResult =
        shell.exec(
          `python3 -c "${jenCode}"`,
          { silent: true },
        ).stdout;
      const pythonCodeResult =
        shell.exec(
          `python3 ${process.cwd()}/${PYTHON_PROGRAMS_DIR}/${name.slice(0, -4)}.py`,
          { silent: true },
        ).stdout;
      assert.deepEqual(jenCodeResult, pythonCodeResult);
    });
  });
});
