const Type = require('./type');

module.exports = class Variable {
  constructor(id, initializer) {
    this.id = id;
    // initializer has type and value
    this.type = initializer ? initializer.type : Type.ANY;
    this.initializer = initializer;
  }
  analyze(context) {
    context.variableMustNotBeAlreadyDeclared(this.id);
    context.addVariable(this.id, this);
  }
  optimize() {
    return this;
  }
};
