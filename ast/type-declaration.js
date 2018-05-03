module.exports = class TypeDeclaration {
  constructor(id, sumType) {
    Object.assign(this, { id, sumType });
  }

  analyze(context) {
    this.sumType.analyze(context);
    context.addSumType(this.id, this.sumType);
  }

  /* eslint-disable class-methods-use-this */
  optimize() {
    // Purposefully empty for now!
  }
};
