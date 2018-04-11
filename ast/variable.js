module.exports = class Variable {
  constructor(id) {
    this.id = id;
  }
  /* eslint-disable */
  analyze(context) {

    // This is inteded that if the context is looked up, it will set the flag.
    // This logic doesnt seem quite right though.
    if(context.lookup(this.id)) {
      this.used = true;
    }

  }
  /* eslint-enable */

  optimize() {
    return this;
  }
};
