module.exports = class Variable {
  constructor(id, type) {
    this.id = id;
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
