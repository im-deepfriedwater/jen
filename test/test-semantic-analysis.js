/*
 * Semantic Analysis Tests
 *
 * Credit to @rtoal
 * https://github.com/rtoal/plainscript/blob/master/test/analyzer/analyzer-test.js
 *
 * Tests that the semantic analysis phase decorates the AST as expected for
 * semantically correct programs, and enforces static semantic rules by
 * throwing the expected errors.
 */

const fs = require('fs');
const assert = require('assert');
const parse = require('../syntax/parser');

const TEST_DIR = 'test/data/semantic-errors';

describe('The semantic analyzer', () => {
  fs.readdirSync(TEST_DIR).forEach((name) => {
    it(`detects a ${name.replace(/[^a-z]/g, ' ')}`, () => {
      const program = parse(fs.readFileSync(`${TEST_DIR}/${name}`, 'utf-8'));
      const errorPattern = RegExp(name.replace('.error', '').replace(/-/g, ' '), 'i');
      assert.throws(() => program.analyze(), errorPattern);
    });
  });

  // Commented out for now
  // fs.readdirSync('test/data/good-programs').forEach((name) => {
  //   it(`should analyze ${name} without errors`, () => {
  //     // For now, we are happy to know that these files pass semantic analysis.
  //     // We eventually need to check that the ASTs are properly decorated.
  //     const program = parse(fs.readFileSync(`${__dirname}/${name}`, 'utf-8'));
  //     program.analyze();
  //   });
  // });
});
