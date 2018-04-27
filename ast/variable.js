const Type = require('./type');

module.exports = class Variable {
  constructor(id, literal) {
    this.id = id;
    // literal has type and value
    this.type = literal ? literal.type : Type.ANY;
    this.literal = literal;
    this.used = false;
  }
  analyze(context) {
    context.variableMustNotBeAlreadyDeclared(this.id);
    context.addVariable(this.id, this);
  }
  optimize() {
    // context.checkIfThisIsUnused(this);
    return this;
  }
};
