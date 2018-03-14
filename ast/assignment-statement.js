module.exports = class AssignmentStatement {
  constructor (targets, sources) {
    Object.assign(this, { targets, sources });
  }

  analyze (context) {
    if (this.targets.length !== this.sources.length) {
      throw new Error('Number of variables does not equal number of expressions');
    }

    this.sources.forEach(s => s.analyze(context));
    this.targets.forEach(t => t.analyze(context));
  }

  optimize () {
    this.sources.forEach(s => s.optimize());
    this.targets.forEach(t => t.optimize());
    return this;
  }
};
