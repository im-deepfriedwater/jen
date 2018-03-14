module.exports = class BooleanLiteral {
  constructor (value) {
    this.value = value;
  }

  analyze () {
    // empty on purpose!
  }

  optimize () {
    return this;
  }
};
