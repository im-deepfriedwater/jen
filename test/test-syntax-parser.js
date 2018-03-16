// Syntax parser module specifically for jen
// For testing purposes only!
//
// Heavily inspired by Ray Toal's parser for iki:
// https://github.com/rtoal/iki-compiler
//
// For use:
//
// const parse = require('./test-syntax-parser');

const ohm = require('ohm-js');
const fs = require('fs');
const withIndentsAndDedents = require('../syntax/preparser.js');

const grammar = ohm.grammar(fs.readFileSync('./syntax/jen.ohm'));

module.exports = (text) => {
  const match = grammar.match(withIndentsAndDedents(text));
  if (!match.succeeded()) {
    throw match.message;
  }
};
