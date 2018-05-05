module.exports = class AssignmentStatement {
  constructor(ids, initializers) {
    Object.assign(this, { ids, initializers });
  }

  analyze(context) {
    if (!this.ids.length) {
      this.ids = [this.ids];
    }
    if (this.ids.length !== this.initializers.length) {
      throw new Error('Number of variables does not equal number of expressions');
    }
    this.initializers.forEach(s => s.analyze(context));
    // look up the variable from context
    // look up variables not in the context, undeclared variable assignment error
    this.ids.forEach(id => id.analyze(context));
    this.ids.forEach((id, i) => {
      id.referent.type.mustBeCompatibleWith(this.initializers[i].type, 'Type Mismatch at Assignment');
    });
  }

  optimize() {
    this.initializers.forEach(s => s.optimize());
    this.ids.forEach(t => t.optimize());
    return this;
  }
};
