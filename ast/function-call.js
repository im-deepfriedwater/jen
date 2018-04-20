module.exports = class Call {
  constructor(callee, args) {
    Object.assign(this, { callee, args });
  }

  analyze(context) {
    this.callee.analyze(context);
    context.assertIsFunction(this.callee.referent);
    this.args.forEach(arg => arg.analyze(context));
    this.checkArgumentMatching(this.callee.referent);
  }

  checkArgumentMatching(callee) {
    if (this.args.length > callee.params.length) {
      throw new Error('Too many arguments in call');
    } else if (this.args.length < callee.params.length) {
      throw new Error('Too little arguments in call');
    }

    this.args.forEach((arg, index) => {
      arg.type.mustBeCompatibleWith(callee.convertedParamTypes[index], 'Type Mismatch at Function Call');
    });
  }

  optimize() {
    this.callee = this.callee.optimize();
    this.args.forEach(arg => arg.optimize());
    return this;
  }
};
