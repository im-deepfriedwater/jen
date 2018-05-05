module.exports = class IdentifierExpression {
  constructor(id) {
    this.id = id;
  }

  analyze(context) {
    this.referent = context.lookup(this.id);
    context.markVariableUsed(this.id);
    this.type = this.referent.type;
  }
};
