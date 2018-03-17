module.exports = class BooleanLiteral {
  constructor(value) {
    this.value = value;
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
