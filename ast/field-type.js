const Type = require('./type');
const RecordType = require('./record-type');

module.exports = class FieldType {
  constructor(id, type) {
    Object.assign(this, { id, type });
  }
  /* eslint-disable */
  analyze(context) {
    // TODO
    // console.log('hello');
    this.recordTypes = {};
    const typeId = type instanceof RecordType ? id : this;
    this.recordTypes[typeId] = Type.cache[typeId] || context.lookupFieldType(typeId)

    // type => basic type, sum type, record type
    // look at function-object basic paramTypes
  }
  /* eslint-enable */
  isCompatibleWith(otherType) {
    return Object.keys(this.recordTypes)
      .some(typeKey => this.recordTypes[typeKey].isCompatibleWith(otherType));
  }

  optimize() {
    return this;
  }
};
