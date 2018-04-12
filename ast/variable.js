module.exports = class Variable {
  constructor(id) {
    this.id = id;
  }
  /* eslint-disable */
  analyze(context) {
    // No idea if this is remotely correct, I think this is the right idea but the
    // function probably needs some tweaking
    context.checkIfThisIsUnused(this);
  }
  /* eslint-enable */

  optimize() {
    return this;
  }
};
