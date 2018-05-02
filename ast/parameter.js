module.exports = class Parameter {
  constructor(id) {
    Object.assign(this, { id });
  }

  get isRequired() {
    return this.defaultExpression === null;
  }

  analyze(context) {
    context.add(this);
  }

  optimize() {
    return this;
  }
};
