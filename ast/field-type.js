const Type = require('./type');
const RecordType = require('./record-type');

module.exports = class FieldType {
  constructor(id, type) {
    Object.assign(this, { id, type });
  }
  /* eslint-disable */
  analyze(context) {
    // TODO
    // type => basic type, sum type, record type
    // look at function-object basic paramTypes
  }
  /* eslint-enable */

  optimize() {
    return this;
  }
};
