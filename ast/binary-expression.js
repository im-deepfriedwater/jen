module.exports = class BinaryExpression {
  constructor(op, left, right) {
    Object.assign(this, { op, left, right });
  }

  analyze(context) {
    this.left.analyze(context);
    this.right.analyze(context);
  }

  optimize() {
    this.left = this.left.optimize();
    this.right = this.right.optimize();
    return this;
  }
};
