module.exports = class FieldValue {
  constructor(id, expression) {
    this.id = id;
    this.expression = expression;
  }
  /* eslint-disable */
  analyze() {
    // empty on purpose!
  }
  /* eslint-enable */

  optimize() {
    return this;
  }
};
