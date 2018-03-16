module.exports = class Variable {
  constructor(id) {
    this.id = id;
  }

  analyze() {
    // empty on purpose
  }

  optimize() {
    return this;
  }
};
