const Type = require('./type');

module.exports = class Variable {
  constructor(id, type = Type.ANY) {
    this.id = id;
    // initializer has type and value
    this.type = type;
  }
  analyze(context) {
    context.variableMustNotBeAlreadyDeclared(this.id);
    context.addVariable(this.id, this);
  }
  optimize() {
    return this;
  }
};
