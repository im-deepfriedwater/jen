module.exports = class RecordLiteral {
  constructor(fields) {
    this.fields = fields;
  }
  /* eslint-disable */
  analyze() {
    // empty on purpose!
  }
  /* eslint-enable */

  optimize() {
    return this;
  }
};
