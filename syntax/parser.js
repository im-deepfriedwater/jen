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
const VarDec = require('../ast/variable-declaration');
const VarAsgn = require('../ast/assignment-statement');
const BooleanLiteral = require('../ast/boolean-literal');

// const BinaryExpression = require('../ast/binary-expression.js');
// const TernaryExpression = require('../ast/ternary-expression.js');

const grammar = ohm.grammar(fs.readFileSync('./syntax/jen.ohm'));
const astGenerator = grammar.createSemantics().addOperation('ast', {
  Program (_1, body, _2) { return new Program(body.ast()); },
  Body (_1, expressionsAndStatements, _2) { return new Body(expressionsAndStatements.ast()); },
  Declaration (ids, _, exps) { return new VarDec(ids.ast(), exps.ast()); },
  Assignment (ids, _, exps) { return new VarAsgn(ids.ast(), exps.ast()); },
  NonemptyListOf (first, _, rest) { return [first.ast(), ...rest.ast()]; },
  varId (_1, _2) { return this.sourceString; },
  constId (_1, _2) { return this.sourceString; },
  packageId (_1, _2) { return this.sourceString; },
  booleanLiteral (_) { return new BooleanLiteral(!!this.sourceString); },
  _terminal () { return this.sourceString; },
  // Assignment () {}



  // // vThis might be right - Thomas
  // Exp_ternary(left, _1, middle, _2, right) { return new TernaryExpression(left.ast(), middle.ast() right.ast()); },
  // Exp1_binary(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
  // Exp2_binary(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
  // Exp3_binary(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
  // Exp4_binary(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
  // // ^This might be right - Thomas

  // id (name) { return ; }
});

module.exports = (text) => {
  const match = grammar.match(withIndentsAndDedents(text));
  if (!match.succeeded()) {
    throw match.message;
  }

  return astGenerator(match).ast();
};
