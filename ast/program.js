const Context = require('../semantics/context');

module.exports = class Program {
  constructor(body) {
    this.body = body;
  }

  analyze() {
    const context = new Context({ parent: Context.INITIAL });
    this.body.analyze(context);
    context.checkForUnusedDeclared(context, 'unused');
  }

  optimize() {
    this.body.optimize();
    return this;
  }
};
