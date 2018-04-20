module.exports = class ListExpression {
  constructor(values) {
    Object.assign(this, { values });
  }

  analyze(context) {
    console.log("test");
    this.values.analyze(context);
  }

  optimize() {
    return this;
  }
};
