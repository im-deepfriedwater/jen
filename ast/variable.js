module.exports = class Variable {
  constructor(id, type) {
    this.id = id;
    this.type = type;
    this.used = false;
  }
  /* eslint-disable */
  analyze() {
    // // No idea if this is remotely correct, I think this is the right idea but the
    // // function probably needs some tweaking. Might just not be the right place at
    // // all to be doing this.
    // context.checkIfThisIsUnused(this);
  }
  /* eslint-enable */

  optimize() {
    // context.checkIfThisIsUnused(this);
    return this;
  }
};
