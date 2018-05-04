const Variable = require('./variable');
const ListType = require('./list-type');

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
    this.expression.type.mustBeList();
    this.loopVariables = this.ids.map(id => new Variable(id, this.expression.type));
    const bodyContext = context.createChildContextForLoop();
    this.loopVariables.forEach(v => v.analyze(bodyContext));
    this.body.analyze(bodyContext);
  }

  optimize() {
    return this;
  }
};
