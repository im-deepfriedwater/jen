module.exports = class RecordLiteral {
  constructor(fields) {
    this.fields = fields;
  }
  /* eslint-disable */
  analyze(context) {
    context.assertRecordNoDuplicateFields(this, 'Duplicate field names');
  }
  /* eslint-enable */

  optimize() {
    return this;
  }
};
