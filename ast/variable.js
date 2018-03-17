module.exports = class Variable {
  constructor(id) {
    this.id = id;
  }
  /* eslint-disable */
  analyze() {
    // empty on purpose
  }
  /* eslint-enable */

  optimize() {
    return this;
  }
};
