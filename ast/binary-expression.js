const Type = require('./type');

module.exports = class BinaryExpression {
  constructor(op, left, right) {
    Object.assign(this, { op, left, right });
  }

  analyze(context) {
    this.left.analyze(context);
    this.right.analyze(context);
    if (['<=', '>=', '>', '<'].includes(this.op)) {
      this.mustHaveIntegerOperands();
      this.type = Type.BOOLEAN;
    } else if (['==', '!='].includes(this.op)) {
      this.mustHaveCompatibleOperands();
      this.type = Type.BOOLEAN;
    } else if (['&&', '||', '&!&'].includes(this.op)) {
      this.mustHaveBooleanOperands();
      this.type = Type.BOOLEAN;
    } else {
      // All other binary operators are arithmetic
      this.mustHaveIntegerOperands();
      this.type = Type.NUMBER;
    }
  }

  mustHaveIntegerOperands() {
    const errorMessage = `${this.op} must have integer operands`;
    this.left.type.mustBeCompatibleWith(Type.NUMBER, errorMessage, this.op);
    this.right.type.mustBeCompatibleWith(Type.NUMBER, errorMessage, this.op);
  }
  mustHaveBooleanOperands() {
    const errorMessage = `${this.op} must have boolean operands`;
    this.left.type.mustBeCompatibleWith(Type.BOOLEAN, errorMessage, this.op);
    this.right.type.mustBeCompatibleWith(Type.BOOLEAN, errorMessage, this.op);
  }
  mustHaveCompatibleOperands() {
    const errorMessage = `${this.op} must have mutually compatible operands`;
    this.left.type.mustBeMutuallyCompatibleWith(this.right.type, errorMessage, this.op);
  }

  optimize() {
    this.left = this.left.optimize();
    this.right = this.right.optimize();
    return this;
  }
};
