module.exports = class ListExpression {
  constructor(values) {
    Object.assign(this, { values });
  }

  analyze(context) {
    this.values.analyze(context);
  }

  optimize() {
    return this;
  }
};
