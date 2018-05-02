const Type = require('./type.js');

module.exports = class ErrorLiteral {
  constructor(value) {
    this.value = value;
  }

  analyze() {
    this.type = Type.ERROR;
  }

  optimize() {
    return this;
  }
};
