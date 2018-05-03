const Type = require('./type.js');

module.exports = class StringLiteral {
  constructor(value) {
    this.value = value;
  }

  analyze() { // eslint-disable-line class-methods-use-this
    this.type = Type.STRING;
  }

  optimize() {
    return this;
  }
};
