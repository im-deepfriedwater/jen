module.exports = class Variable {
  constructor(id) {
    this.id = id;
  }
  /* eslint-disable */
  analyze(context) {
    // No idea if this is remotely correct, I think this is the right idea but the
    // function probably needs some tweaking. Might just not be the right place at
    // all to be doing this.
    context.checkIfThisIsUnused(this);
  }
  /* eslint-enable */

  optimize(context) {
    context.checkIfThisIsUnused(this);
    return this;
  }
};
