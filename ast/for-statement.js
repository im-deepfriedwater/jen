const Variable = require('./variable');

module.exports = class ForStatement {
  // have to change test->ids testobj->exp but dont want to deal with ast test rn
  constructor(ids, expression, body) {
    Object.assign(this, { ids, expression, body });
  }

  analyze(context) {
    // We analyze the expression first so we can infer its type for our
    // loop variables.
    // Note that expressions in for loops only look outside for scope.
    this.expression.analyze(context);
    this.loopVariables = this.ids.map(id => new Variable(id, this.expression.type));
    const bodyContext = context.createChildContextForLoop();
    this.loopVariables.forEach(v => v.analyze(bodyContext));
  }

  optimize() {
    return this;
  }
};
