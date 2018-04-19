module.exports = class ListTypeExpression {
  constructor(listType) {
    Object.assign(this, { listType });
  }

  analyze(context) {
    this.type.analyze(context);
  }

  optimize() {
    return this;
  }
};
