module.exports = class SumType {
  constructor(basicTypeOrId1, basicTypeOrId2, moreBasicTypesOrIds) {
    this.basicTypeOrId1 = basicTypeOrId1;
    this.basicTypeOrId2 = basicTypeOrId2;
    this.moreBasicTypesOrIds = moreBasicTypesOrIds;
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
