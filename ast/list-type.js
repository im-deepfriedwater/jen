module.exports = class ListTypeExpression {
  constructor(type) {
    Object.assign(this, { type });
  }

  analyze(context) {
    this.type.analyze(context);
  }

  optimize() {
    return this;
  }
};
