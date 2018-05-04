const Variable = require('./variable');
const ApproximateType = require('../semantics/approximate-type');

module.exports = class ForStatement {
  constructor(ids, expression, body) {
    Object.assign(this, { ids, expression, body });
  }

  analyze(context) {
    // We analyze the expression first so we can infer its type for our
    // loop variables.
    // Note that expressions in for loops only look outside for scope.
    this.expression.analyze(context);
    // Now we type check the for iterable to make sure it is a list type.
    if (!(this.expression.type instanceof ApproximateType)) {
      throw new Error('Non-iterable used in for loop expression');
    }
    this.loopVariables = this.ids.map(id => new Variable(id, this.expression.type.getMemberType()));
    const bodyContext = context.createChildContextForLoop();
    this.loopVariables.forEach((v) => {
      bodyContext.add(v);
    });
    this.body.analyze(bodyContext);
  }

  optimize() {
    return this;
  }
};
