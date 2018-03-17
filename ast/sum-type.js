module.exports = class SumType {
  constructor(basicTypeOrId, moreBasicTypeOrId1) {
    this.basicTypeOrId = basicTypeOrId;
    this.moreBasicTypeOrId1 = moreBasicTypeOrId1;
  }

  analyze(context) {
    this.basicTypeOrId.analyze(context);
    this.moreBasicTypeOrId1.analyze(context);
  }

  optimize() {
    this.basicTypeOrId = this.basicTypeOrId.optimize();
    this.moreBasicTypeOrId1 = this.moreBasicTypeOrId1.optimize();
    return this;
  }
};
