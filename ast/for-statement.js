const Variable = require('./variable');

module.exports = class ForStatement {
  // have to change test->ids testobj->exp but dont want to deal with ast test rn
  constructor(test, testObject, body) {
    Object.assign(this, { test, testObject, body });
  }

  analyze(context) {
    this.test.forEach(id => new Variable(id, undefined));
    this.test.forEach(variable => context.add(variable));
    this.test.forEach(variable => context.lookup(variable).analyze());
    const bodyContext = context.createChildContextForLoop();
    this.body.statements.forEach(s => s.analyze(bodyContext));
  }

  optimize() {
    return this;
  }
};
