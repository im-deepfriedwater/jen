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

  optimize() {
    return this;
  }
};
