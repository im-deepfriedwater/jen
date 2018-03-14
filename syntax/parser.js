// Parser module specifically for jen
//
// Heavily inspired by Ray Toal's parser for iki:
// https://github.com/rtoal/iki-compiler
//
// For use:
//
// const parser = require('./parser');
// const program = parse(sourceCodeString);

const ohm = require('ohm-js');
const fs = require('fs');
const withIndentsAndDedents = require('./preparser.js');

const Program = require('../ast/program');
const Body = require('../ast/body');
const BooleanLiteral = require('../ast/boolean-literal');
const VariableDeclaration = require('../ast/variable-declaration');
const VariableAssignment = require('../ast/assignment-statement');

const grammar = ohm.grammar(fs.readFileSync('./syntax/jen.ohm'));

const astGenerator = grammar.createSemantics().addOperation('ast', {
  Program (_1, body, _2) { return new Program(body.ast()); },
  Body (_1, expressionsAndStatements, _2) { return new Body(expressionsAndStatements.ast()); },
  VariableDeclaration (ids, _, exps) { return new VariableDeclaration(ids.ast(), exps.ast()); },
  id (_1, _2) { return this.sourceString; }
});

module.exports = (text) => {
  const match = grammar.match(withIndentsAndDedents(text));
  if (!match.succeeded()) {
    throw match.message;
  }

  return astGenerator(match).ast();
};
