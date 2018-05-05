const Type = require('./type');

module.exports = class ListType {
  constructor(listType) {
    Object.assign(this, { listType });
  }

  analyze(context) {
    // Temporary solution for the empty array, simply make it an array of type any.
    if (this.listType.length === 0) {
      this.computedType = Type.ANY;
      return;
    }

    // Check if we need to do type inference (for list expressions),
    // or if the type is already given to us (manifest typing at function dec).
    if (Array.isArray(this.listType)) {
      this.typeInference(context);
      return;
    }
    // If type is already given to we'll see if it's a basic or sum type.
    if (this.listType in Type.cache) {
      this.computedType = Type.cache[this.listType];
    } else {
      this.computedType = context.lookupSumType(this.listType);
    }
  }

  typeInference(context) {
    const seenTypes = new Set();
    let singleTypeList = true;
    this.listType.forEach((value) => {
      value.analyze(context);
      seenTypes.add(value.type);
      if (seenTypes.size > 1) {
        singleTypeList = false;
      }
    });

    if (singleTypeList) {
      this.computedType = this.listType[0].type;
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


  /* eslint-disable class-methods-use-this */

  optimize() {
    return this;
  }
};
