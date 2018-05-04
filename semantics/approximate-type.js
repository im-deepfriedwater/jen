// Used exclusively at type inference level for figuring out the type
// from a list expression.

const Type = require('../ast/type');

module.exports = class ApproximateType {
  constructor(values) {
    Object.assign(this, { values });
  }

  analyze(context) {
    const seenTypes = new Set();
    let singleTypeList = true;
    this.values.forEach((value) => {
      value.analyze(context);
      seenTypes.add(value.type);
      if (seenTypes.size > 1) {
        singleTypeList = false;
      }
    });

    if (singleTypeList) {
      this.computedType = this.values[0].type;
    } else {
      this.computedType = context.matchListType(seenTypes);
    }
  }

  getMemberType() {
    return this.computedType;
  }


  mustBeCompatibleWith(otherType, message) {
    if (!this.isCompatibleWith(otherType) && this.computedType !== Type.Any) {
      throw message;
    }
  }

  isCompatibleWith(otherType) {
    return this.computedType === otherType.computedType;
  }

  optimize() {
    return this;
  }
};
