module.exports = class FieldValue {
  constructor(id, expression) {
    this.id = id;
    this.expression = expression;
  }
  /* eslint-disable */
  analyze() {
    // need to be able to analyze whether or not a
    // called field exists
  }
  /* eslint-enable */

  optimize() {
    return this;
  }
};
