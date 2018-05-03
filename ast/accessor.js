module.exports = class Accessor {
  constructor(object, property) {
    Object.assign(this, { object, property });
  }

  analyze(context) {
    this.object.analyze(context);
    this.field = context.lookupRecordField(this.object.id, this.property);
    this.type = this.field.type;
    this.field.analyze(context);
  }

  optimize() {
    this.object = this.object.optimize();
    this.field = this.field.optimize();
    return this;
  }
};
