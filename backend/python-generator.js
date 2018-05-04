/*
 * Heavily inspired by Ray Toal's javascript generator for plainscript: https://github.com/rtoal/plainscript/tree/master/backend
 *
 * Translation to Python
 *
 * Requiring this module adds a gen() method to each of the AST classes.
 * Nothing is actually exported from this module.
 *
 * Generally, calling e.gen() where e is an expression node will return the
 * Python translation as a string, while calling s.gen() where s is a
 * statement-level node will write its translation to standard output.
 *
 *   require('./backend/python-generator');
 *   program.gen();
 */

const Context = require('../semantics/context');
const Program = require('../ast/program');
const VariableDeclaration = require('../ast/variable-declaration');
const AssignmentStatement = require('../ast/assignment-statement');
const BreakStatement = require('../ast/break');
const ReturnStatement = require('../ast/return');
const WhileStatement = require('../ast/while-statement');
const IfStatement = require('../ast/if-statement');
const FunctionCall = require('../ast/function-call');
const FunctionDeclaration = require('../ast/function-declaration');
const FunctionObject = require('../ast/function-object');
const BinaryExpression = require('../ast/binary-expression');
const UnaryExpression = require('../ast/unary-expression');
const IdentifierExpression = require('../ast/identifier-expression');
const SubscriptedExpression = require('../ast/subscripted-expression');
const Variable = require('../ast/variable');
const BooleanLiteral = require('../ast/boolean-literal');
const NumericLiteral = require('../ast/numeric-literal');
const StringLiteral = require('../ast/string-literal');
const ErrorLiteral = require('../ast/error-literal');
const Caller = require('../ast/caller');
const TypeDeclaration = require('../ast/type-declaration');
const Accessor = require('../ast/accessor');
const ForStatement = require('../ast/for-statement');

const indentPadding = 2;
let indentLevel = 0;

function emit(line) {
  console.log(`${' '.repeat(indentPadding * indentLevel)}${line}`);
}

function genStatementList(statements) {
  indentLevel += 1;
  statements.forEach(statement => statement.gen());
  indentLevel -= 1;
}

function makeOp(op) {
  return {
    '&&': 'and',
    '||': 'or',
    '!': 'not',
    '^': '**',
  }[op] || op;
}

// pythonName(e) takes any jen object with an id property, such as a
// Variable, Parameter, or FunctionDeclaration, and produces a Python
// name by appending a unique indentifying suffix, such as '_1' or '_503'.
// It uses a cache so it can return the same exact string each time it is
// called with a particular entity.
const pythonName = (() => {
  let lastId = 0;
  const map = new Map();
  return (v) => {
    if (!(map.has(v))) {
      map.set(v, ++lastId); // eslint-disable-line no-plusplus
    }
    return `${v.id}_${map.get(v)}`;
  };
})();

// This is a nice helper for variable declarations and assignment statements.
// The AST represents both of these with lists of sources and lists of targets,
// but when writing out JavaScript it seems silly to write `[x] = [y]` when
// `x = y` suffices.
function parenthesisIfNecessary(a) {
  if (a.length === 1) {
    return `${a}`;
  }
  return `(${a.join(', ')})`;
}

function generateLibraryFunctions() {
  function generateLibraryStub(name, params, body) {
    const entity = Context.INITIAL.declarations[name];
    emit(`def ${pythonName(entity)} (${params}):\n  ${body}`);
  }
  // This is sloppy. There should be a better way to do this.
  emit('import math');
  emit('import random');
  generateLibraryStub('print', 's', 'print(s)');
  generateLibraryStub('pi', '', 'return math.pi');
  generateLibraryStub('sqrt', 'x', 'return math.sqrt(x)');
  generateLibraryStub('toUpper', 's', 'return s.upper()');
  generateLibraryStub('toLower', 's', 'return s.lower()');
  generateLibraryStub('random', '', 'return random.random()');
}

function generateErrorLiteral() {
  emit('ok = \'ok\'');
  emit('err = \'err\'');
}

Object.assign(Accessor.prototype, {
  gen() {
    const object = this.object.gen();
    if (this.property === 'length') {
      return (`len(${(object)})`);
    }
    const property = this.property.gen();
    return (`${(object)}.${(property)}`);
  },
});

Object.assign(AssignmentStatement.prototype, {
  gen() {
    const ids = this.ids.map(id => id.gen());
    const initializers = this.initializers.map(i => i.gen());
    emit(`${(ids)} = ${(initializers)}`);
  },
});

Object.assign(BinaryExpression.prototype, {
  gen() {
    if (this.op === '&!&') {
      return `((${this.left.gen()} and not ${this.right.gen()}) or \
(not ${this.left.gen()} and ${this.right.gen()}))`;
    }
    if (this.op === '/%') {
      return `(divmod(${this.left.gen()}, ${this.right.gen()}))`;
    }
    return `(${this.left.gen()} ${makeOp(this.op)} ${this.right.gen()})`;
  },
});

Object.assign(BooleanLiteral.prototype, {
  gen() {
    const value = this.value ? 'True' : 'False';
    return `${value}`;
  },
});

Object.assign(BreakStatement.prototype, {
  gen() { emit('break'); },
});

Object.assign(Caller.prototype, {
  gen() { emit(`${this.call.gen()}`); },
});

Object.assign(FunctionCall.prototype, {
  gen() {
    const fun = this.callee.referent;
    const { params } = this.callee.referent;
    const { args } = this;
    return (`${pythonName(fun)}(${args.map(a => (a ? a.gen() : 'undefined')).join(', ')})`);
  },
});

Object.assign(FunctionDeclaration.prototype, {
  gen() {
    return this.function.gen();
  },
});

Object.assign(FunctionObject.prototype, {
  gen() {
    emit(`def ${pythonName(this)}(${this.params.map(p => p.gen()).join(', ')}):`);
    genStatementList(this.suite.statements);
  },
});

Object.assign(IdentifierExpression.prototype, {
  gen() {
    return this.referent.gen();
  },
});

Object.assign(IfStatement.prototype, {
  gen() {
    this.cases.forEach((c, index) => {
      const prefix = index === 0 ? 'if' : 'else if';
      emit(`${prefix} ${c.test.gen()}:`);
      genStatementList(c.body.statements);
    });
    if (this.alternate) {
      emit('else: ');
      genStatementList(this.alternate.statements);
    }
  },
});

Object.assign(NumericLiteral.prototype, {
  gen() { return `${this.value}`; },
});

Object.assign(Program.prototype, {
  gen() {
    generateLibraryFunctions();
    generateErrorLiteral();
    this.body.statements.forEach(statement => statement.gen());
  },
});

Object.assign(ReturnStatement.prototype, {
  gen() {
    if (this.returnValue) {
      emit(`return ${parenthesisIfNecessary(this.returnValue.map(r => r.gen()))}`);
    } else {
      emit('return');
    }
  },
});

Object.assign(StringLiteral.prototype, {
  gen() { return `${this.value}`; },
});

Object.assign(SubscriptedExpression.prototype, {
  gen() {
    const base = this.variable.gen();
    const subscript = this.subscript.gen();
    return `${base}[${subscript}]`;
  },
});

Object.assign(UnaryExpression.prototype, {
  gen() { return `(${makeOp(this.op)}${this.operand.gen()})`; },
});

Object.assign(VariableDeclaration.prototype, {
  gen() {
    const variables = this.variables.map(v => v.gen());
    const initializers = this.initializers.map(i => i.gen());
    emit(`${(variables)} = ${(initializers)}`);
  },
});

Object.assign(Variable.prototype, {
  gen() { return pythonName(this); },
});

Object.assign(WhileStatement.prototype, {
  gen() {
    emit(`while ${this.test.gen()}: `);
    genStatementList(this.body.statements);
  },
});

Object.assign(ForStatement.prototype, {
  gen() {
    const ids = this.ids.map(i => i.gen());
    const expression = this.expression.gen();
    emit(`for ${(ids)} in ${(expression)}:`);
    genStatementList(this.body.statements);
  },
});

Object.assign(ErrorLiteral.prototype, {
  gen() { return `${this.value}`; },
});

Object.assign(TypeDeclaration.prototype, {
  gen() {
    emit('');
  },
});
