module.exports = class Accessor {
  constructor(object, property) {
    Object.assign(this, { object, property });
  }

  analyze(context) {
    const predefined = ['length'];
    this.object.analyze(context);
    if (predefined.includes(this.property)) {
      return;
    }
    this.property.analyze(context);
  }

  optimize() {
    this.object = this.object.optimize();
    this.property = this.property.optimize();
    return this;
  }
};
