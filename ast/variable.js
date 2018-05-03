const Type = require('./type');

module.exports = class Variable {
  constructor(id, type = Type.ANY) {
    this.id = id;
    this.type = type;
  }
  analyze(context) {
    context.add(this);
  }
  optimize() {
    return this;
  }
};
