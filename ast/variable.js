module.exports = class Variable {
  constructor(id, type) {
    this.id = id;
    this.type = type;
  }
  /* eslint-disable */
  analyze() {
    // nothing here
  }
  /* eslint-enable */

  optimize() {
    // context.checkIfThisIsUnused(this);
    return this;
  }
};
