const Type = require('./type.js');

module.exports = class RecordLiteral {
  constructor(fields) {
    this.fields = fields;
  }
  /* eslint-disable */
  analyze(context) {
    // this.type = Type.RECORD;
    
    // console.log(this);
    // context.analyzeFields(this, fields);
    context.assertRecordNoDuplicateFields(this, 'Duplicate field names');
    // add record to the context object
    this.fields.forEach((field) => {
      field.analyze(context);
    });
  }
  /* eslint-enable */

  optimize() {
    return this;
  }
};
