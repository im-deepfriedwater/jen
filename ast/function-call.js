module.exports = class Call {
  constructor(callee, args) {
    Object.assign(this, { callee, args });
  }

  analyze(context) {
    this.callee.analyze(context);
    context.assertIsFunction(this.callee.referent);
    this.checkArgumentMatching(this.callee.referent);
    this.args.forEach(arg => arg.analyze(context));
  }

  checkArgumentMatching(callee) {
    let keywordArgumentSeen = false;
    const matchedParameterNames = new Set([]);
    this.args.forEach((arg, index) => {
      if (index >= callee.params.length) {
        throw new Error('Too many arguments in call');
      }
      if (arg.isKeywordArgument) {
        keywordArgumentSeen = true;
      } else if (keywordArgumentSeen) {
        throw new Error('Positional argument in call after keyword argument');
      }
      const parameterName = arg.id ? arg.id : callee.params[index].id;
      if (!callee.allParameterNames.has(parameterName)) {
        throw new Error(`Function does not have a parameter called ${parameterName}`);
      }
      if (matchedParameterNames.has(parameterName)) {
        throw new Error(`Multiple arguments for parameter ${parameterName}`);
      }
      matchedParameterNames.add(parameterName);
    });
  }

  optimize() {
    this.callee = this.callee.optimize();
    this.args.forEach(arg => arg.optimize());
    return this;
  }
};
