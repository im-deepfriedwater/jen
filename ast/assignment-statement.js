module.exports = class AssignmentStatement {
  constructor(ids, initializers) {
    Object.assign(this, { ids, initializers });
  }

  analyze(context) {
    if (this.targets.length !== this.sources.length) {
      throw new Error('Number of variables does not equal number of expressions');
    }

    this.sources.forEach(s => s.analyze(context));
    this.targets.forEach(t => t.analyze(context));

    this.targets.forEach((t, i) => {
      t.type.mustBeCompatibleWith(this.sources[i], 'Type Mismatch at Assignment');
    });
  }

  optimize() {
    this.sources.forEach(s => s.optimize());
    this.targets.forEach(t => t.optimize());
    return this;
  }
};
