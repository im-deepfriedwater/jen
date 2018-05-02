module.exports = class Call {
  constructor(callee, args) {
    Object.assign(this, { callee, args });
  }

  analyze(context) {
    this.callee.analyze(context);
    this.args.forEach(arg => arg.analyze(context));
    context.assertIsFunction(this.callee.referent);
    this.checkArgumentMatching(this.callee.referent);
    this.type = this.callee.convertedParamTypes;
  }

  checkArgumentMatching(callee) {
    if (callee.params[0] === 'void' && this.args.length === 0) {
      return;
    } else if (this.args.length > callee.params.length) {
      throw new Error('Too many arguments in call');
    } else if (this.args.length < callee.params.length) {
      throw new Error('Too little arguments in call');
    }

    this.args.forEach((arg, index) => {
      // first we check if
      arg.type.mustBeCompatibleWith(callee.convertedParamTypes[index], 'Type Mismatch at Function Call');
    });
  }

  optimize() {
    this.callee = this.callee.optimize();
    this.args.forEach(arg => arg.optimize());
    return this;
  }
};
