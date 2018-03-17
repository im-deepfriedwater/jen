module.exports = class TernaryExpression {
  constructor(conditional, trueValue, falseValue) {
    Object.assign(this, { conditional, trueValue, falseValue });
  }

  analyze(context) {
    this.conditional.analyze(context);
    this.trueValue.analyze(context);
    this.falseValue.analyze(context);
  }

  optimize() {
    this.conditional = this.conditional.optimize();
    this.trueValue = this.trueValue.optimize();
    this.falseValue = this.falseValue.optimize();
    return this;
  }
};
