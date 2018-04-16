module.exports = class RecordLiteral {
  constructor(fields) {
    this.fields = fields;
  }
  /* eslint-disable */
  analyze() {
    // TODO prevent duplicate fields
    context.assertRecordNoDuplicates('Duplicate field names');
    // if (this.fields) {
    //   this.fields.analyze(context);
    // }
  }
  /* eslint-enable */

  optimize() {
    return this;
  }
};
