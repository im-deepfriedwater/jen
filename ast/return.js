module.exports = class ReturnStatement {
  constructor(returnValue) {
    this.returnValue = returnValue;
  }

  analyze(context) {
    context.assertInFunction('Return statement outside function');
    if (this.returnValue) {
      this.returnValue.forEach(value => value.analyze(context));
    }
  }

  optimize() {
    if (this.returnValue) {
      this.returnValue = this.returnValue.optimize();
    }
    return this;
  }
};
