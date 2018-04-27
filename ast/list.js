module.exports = class ListExpression {
  constructor(values) {
    Object.assign(this, { values });
  }

  analyze(context) {
    this.values.forEach(v => v.analyze(context));
  }

  optimize() {
    return this;
  }
};
