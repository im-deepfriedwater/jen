module.exports = class ListType {
  constructor(type) {
    Object.assign(this, { type });
  }

  analyze(context) {
    this.type.analyze(context);
  }

  optimize() {
    this.type = this.listExpression.optimize();
    return this;
  }
};
