module.exports = class Caller {
  constructor(c) {
    this.call = c;
  }

  analyze(context) {
    this.call.analyze(context);
  }

  optimize() {
    this.call = this.call.optimize();
    return this;
  }
};
