module.exports = class Signature {
  constructor(id, params) {
    Object.assign(this, { id, params });
  }
  /* eslint-disable class-methods-use-this */
  analyze() {
    // blank for now
  }

  optimize() {
    return this;
  }
};
