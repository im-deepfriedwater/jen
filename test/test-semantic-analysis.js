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
const sinon = require('sinon');
const parse = require('../syntax/parser');

const GOOD_PROGRAMS_DIR = 'test/data/good-programs';
const BAD_PROGRAMS_DIR = 'test/data/semantic-errors';
const OKAY_PROGRAMS_DIR = 'test/data/semantic-warnings';

describe('The semantic analyzer', () => {
  fs.readdirSync(BAD_PROGRAMS_DIR).forEach((name) => {
    // To explain the last .replace call, the parenthesis denotes a capturing
    // group. $1 refers to the first capturing group. This is necessary as
    // the names of certain error files include reserved characters for
    // regexes, so we put a backslash.
    const errorName = name.replace(/-/g, ' ').replace(/\.jen/g, '')
      .replace(/times/, '*')
      .replace(/lessthan/, '<')
      .replace(/greaterthan/, '>')
      .replace(/minus/, '-')
      .replace(/intdiv/, '//')
      .replace(/divmod/, '/%')
      .replace(/div/, '/')
      .replace(/or/, '||')
      .replace(/([+^<*])/g, '\\$1');
    it(`detects a ${errorName} error`, () => {
      const program = parse(fs.readFileSync(`${BAD_PROGRAMS_DIR}/${name}`, 'utf-8'));
      const errorPattern = RegExp(errorName, 'i');
      assert.throws(() => program.analyze(), errorPattern);
    });
  });

  fs.readdirSync(GOOD_PROGRAMS_DIR).forEach((name) => {
    it(`should analyze ${name} without errors`, () => {
      const program = parse(fs.readFileSync(`${GOOD_PROGRAMS_DIR}/${name}`, 'utf-8'));
      program.analyze();
    });
  });

  fs.readdirSync(OKAY_PROGRAMS_DIR).forEach((name) => {
    it(`should analyze ${name} with a warning`, () => {
      const spy = sinon.spy(console, 'warn');
      const program = parse(fs.readFileSync(`${OKAY_PROGRAMS_DIR}/${name}`, 'utf-8'));
      program.analyze();

      // Hardcoded for now
      assert(spy.calledWith('Unused declared variables'));

      spy.restore();
    });
  });
});
