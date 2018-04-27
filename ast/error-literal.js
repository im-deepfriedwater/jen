const Type = require('./type.js');

module.exports = class ErrorLiteral {
  constructor(value) {
    this.value = value;
  }

  analyze() { // eslint-disable-line class-methods-use-this
    // Intentionally empty
    this.type = Type.Error;
  }

  optimize() {
    return this;
  }
};
