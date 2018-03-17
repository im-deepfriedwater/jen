module.exports = class List {
  constructor(values) {
    Object.assign(this, { values });
  }

  analyze(context) {
    this.values.analyze(context);
  }

  optimize() {
    this.values = this.listExpression.optimize();
    return this;
  }
};
