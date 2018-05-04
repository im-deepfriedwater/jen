const Type = require('./type');
module.exports = class ListType {
  constructor(listType) {
    Object.assign(this, { listType });
  }

  analyze(context) {
  //  this.type.analyze(context);
    // check if type is in type cache or check context.
    if (this.listType in Type.cache) {
      this.computedType = Type.cache[this.listType];
    } else {
      this.computedType = context.lookupSumType(this.listType);
    }
  }

  /* eslint-disable class-methods-use-this */

  optimize() {
    return this;
  }
};
