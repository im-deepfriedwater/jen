const SumType = require('./sum-type');

module.exports = class TypeDeclaration {
  constructor(id, sumtype) {
    this.id = id;
    this.sumtype = sumtype;
  }

  analyze(context) {
    this.id.analyze(context);
    this.sumtype.analyze(context);
  }

  optimize() {
    this.id = this.id.optimize();
    this.sumtype = this.sumtype.optimize();
    return this;
  }
};
