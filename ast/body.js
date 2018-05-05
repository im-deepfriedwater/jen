const Context = require('../semantics/context');

module.exports = class Body {
  constructor(statements) {
    this.statements = statements;
  }

  analyze(context) {
    this.statements.forEach(s => s.analyze(context));
    context.checkForUnusedDeclared(context, 'Unused declared variables');
  }

  optimize() {
    this.statements.map(s => s.optimize()).filter(s => s !== null);
    return this;
  }
};
