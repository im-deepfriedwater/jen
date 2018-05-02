const Type = require('./type.js');

module.exports = class SumType {
  constructor(basicTypeOrId1, basicTypeOrId2, moreBasicTypesOrIds) {
    Object.assign(this, {
      types: [basicTypeOrId1, basicTypeOrId2, ...moreBasicTypesOrIds],
    });
  }

  analyze(context) {
    // Creates a mapping of each string representation of a type to the actual
    // type it is referencing. This allows for recursively checking through
    // sum types in the case of nested sum types.

    this.computedType = {};
    this.types.forEach((type) => {
      this.computedType[type] = Type.cache[type] || context.lookupSumType(type);
      if (this.computedType[type] === undefined) {
        throw new Error(`Invalid or undeclared type ${type} at type declaration.`);
      }
    });

    console.log('we did it');
  }

  mustBeCompatibleWith(otherType, message) {

  }

  /* eslint-disable class-methods-use-this */
  optimize() {
    // Later we can implement an optimization step that further reduces sum types
    // to basic types.
  }
};
