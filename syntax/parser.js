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
const NumericLiteral = require('../ast/numeric-literal');
const StringLiteral = require('../ast/string-literal');
const WhileStatement = require('../ast/while-statement');
const BinaryExpression = require('../ast/binary-expression');
const UnaryExpression = require('../ast/unary-expression');
const SubscriptedExpression = require('../ast/subscripted-expression');
const FunctionCall = require('../ast/function-call');
const Return = require('../ast/return');
const TernaryExpression = require('../ast/ternary-expression');
const ErrorLiteral = require('../ast/error-literal');
const ForStatement = require('../ast/for-statement');
const Case = require('../ast/case');
const IfStatement = require('../ast/if-statement');
const Accessor = require('../ast/accessor');
const ListExpression = require('../ast/list');
const ListTypeExpression = require('../ast/list-type');
const TypeDeclaration = require('../ast/type-declaration');
const SumTypeClass = require('../ast/sum-type');

// Credit to Ray Toal:
// Ohm turns `x?` into either [x] or [], which we should clean up for our AST.
const unpack = a => (a.length === 0 ? null : a[0]);

const grammar = ohm.grammar(fs.readFileSync('./syntax/jen.ohm'));
/* eslint-disable no-unused-vars */
const astGenerator = grammar.createSemantics().addOperation('ast', {
  Program(_1, body, _2) { return new Program(body.ast()); },
  Body(_1, expressionsAndStatements, _2) { return new Body(expressionsAndStatements.ast()); },
  Suite(_1, _2, body, _3) { return body.ast(); },
  Conditional(
    _1, firstTest, _2, firstSuite, _3, moreTests, _4, _5, moreSuites,
    _6, _7, _8, lastSuite,
  ) {
    const tests = [firstTest.ast(), ...moreTests.ast()];
    const bodies = [firstSuite.ast(), ...moreSuites.ast()];
    const cases = tests.map((test, index) => new Case(test, bodies[index]));
    return new IfStatement(cases, unpack(lastSuite.ast()));
  },
  Declaration(ids, _, exps) { return new VarDec(ids.ast(), exps.ast()); },
  Assignment(ids, _, exps) { return new VarAsgn(ids.ast(), exps.ast()); },
  For(_1, exps, _2, e, _3, suite) { return new ForStatement(exps.ast(), e.ast(), suite.ast()); },
  While(_1, exps, _2, suite) { return new WhileStatement(exps.ast(), suite.ast()); },
  TypeDec(_1, id, sumType) { return new TypeDeclaration(id.ast(), sumType.ast()); },
  ReturnExp(_, e) { return new Return(unpack(e.ast())); },
  // FuncDec(annotation, _1, signature, _2, suite) {
  //   return new FunctionDeclaration(id.ast(), params.ast(), suite.ast());
  // },
  Expression_ternary(conditional, _1, trueValue, _2, falseValue) {
    return new TernaryExpression(conditional.ast(), trueValue.ast(), falseValue.ast());
  },
  Exp0_and(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
  Exp0_or(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
  Exp0_xor(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
  Exp1_binary(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
  Exp2_binary(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
  Exp3_binary(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
  Exp4_binary(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
  Exp5_not(op, operand) { return new UnaryExpression(op.ast(), operand.ast()); },
  Exp6_accessor(object, _1, property, _2) { return new Accessor(object.ast(), property.ast()); },
  Exp6_binary(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
  Exp7_parens(_1, expression, _2) { return expression.ast(); },

  List(_1, values, _2) { return new ListExpression(values.ast()); },
  ListType(_1, type) { return new ListTypeExpression(type.ast()); },
  SumType(basicTypeOrId1, _1, moreBasicTypeOrId1) {
    return new SumTypeClass(basicTypeOrId1.ast(), moreBasicTypeOrId1.ast());
  },
  FuncCall(callee, _1, args, _2) { return new FunctionCall(callee.ast(), args.ast()); },
  SubscriptExp(id, _1, expression, _2) {
    return new SubscriptedExpression(id.ast(), expression.ast());
  },
  NonemptyListOf(first, _, rest) { return [first.ast(), ...rest.ast()]; },
  varId(_1, _2) { return this.sourceString; },
  constId(_1, _2) { return this.sourceString; },
  packageId(_1, _2) { return this.sourceString; },
  booleanLiteral(_) { return new BooleanLiteral(!!this.sourceString); },
  numLiteral(_) { return new NumericLiteral(+this.sourceString); },
  errLiteral(_) { return new ErrorLiteral(this.sourceString); },
  stringLiteral(_1, chars, _2) { return new StringLiteral(this.sourceString); },
  _terminal() { return this.sourceString; },
});

module.exports = (text) => {
  const match = grammar.match(withIndentsAndDedents(text));
  if (!match.succeeded()) {
    throw match.message;
  }

  return astGenerator(match).ast();
};
