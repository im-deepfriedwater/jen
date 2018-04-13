const Context = require('../semantics/context');

module.exports = class Program {
  constructor(body) {
    this.body = body;
  }

  analyze() {
    const context = new Context({ parent: Context.INITIAL });
    this.body.analyze(context);
    throw new Error('a');
    // context.checkForUnusedDeclared();
  }

  optimize() {
    this.body.optimize();
    return this;
  }
};
