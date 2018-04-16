module.exports = class Variable {
  constructor(id, type) {
    this.id = id;
    this.type = type;
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
