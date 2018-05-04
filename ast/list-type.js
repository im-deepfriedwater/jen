module.exports = class ListType {
  constructor(listType) {
    Object.assign(this, { listType });
  }

  analyze(context) {
  //  this.type.analyze(context);
  }
  /* eslint-disable class-methods-use-this */
  mustBeList() {
    // purposefully empty...
  }
  optimize() {
    return this;
  }
};
