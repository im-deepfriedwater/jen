module.exports = class ApproximateType {
  constructor(values) {
    Object.assign(this, { values });
  }

  analyze(context) {
    this.computedType = {};
    
    this.values.forEach((value) => {

    });
  }

  optimize() {
    return this;
  }
};
