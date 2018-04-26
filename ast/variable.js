const Type = require('./type');

module.exports = class Variable {
  constructor(id, literal) {
    this.id = id;
    // literal has type and value
    this.type = literal ? literal.type : Type.ANY;
    this.literal = literal;
  }
  analyze(context) {
    context.variableMustNotBeAlreadyDeclared(this.id);
    context.addVariable(this.id, this);
  }
  optimize() {
    return this;
  }
};
