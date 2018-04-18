module.exports = class Annotation {
  constructor(id, paramTypes, resultTypes) {
    Object.assign(this, { id, paramTypes, resultTypes });
  }
  /* eslint-disable class-methods-use-this */
  analyze() {
    // blank for now
  }

  optimize() {
    return this;
  }
};
