// Borrowed from rtoal's test suite from iki!
// https://github.com/rtoal/iki-compiler

const fs = require('fs');
const parse = require('../parser');
const assert = require('assert');

const goodProgramsTest = require('test-good-programs.js');
const syntaxErrorsTest = require('test-syntax-errors.js');

const TEST_DIR = 'test/data/good-programs';
const TEST_DIR_ERROR = 'test/data/syntax-errors';


goodPrograms();
syntaxErrorsTest();
