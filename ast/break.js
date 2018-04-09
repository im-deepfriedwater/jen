module.exports = class BreakStatement {
  constructor() { // eslint-disable-line
    // Intentionally empty
  }

  analyze(context) { // eslint-disable-line class-methods-use-this
    context.assertInLoop('Break statement outside loop');
  }

  optimize() {
    return this;
  }
};
