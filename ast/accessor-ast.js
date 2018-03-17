module.exports = class Accessor {
  constructor(object, property) {
    Object.assign(this, { object, property });
  }

  analyze(context) {
    this.object.analyze(context);
    this.property.analyze(context);
  }

  optimize() {
    this.object = this.object.optimize();
    this.property = this.property.optimize();
    return this;
  }
};
