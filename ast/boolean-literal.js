const Type = require('./type.js');

module.exports = class BooleanLiteral {
  constructor(value) {
    this.value = value;
  }

  analyze() {
    this.type = Type.BOOLEAN;
  }

  optimize() {
    return this;
  }
};
