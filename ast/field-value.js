// const Type = require('./type.js');
const StringLiteral = require('./string-literal.js');

module.exports = class FieldValue {
  constructor(id, expression) {
    // console.log(id);
    // console.log(expression);
    this.id = id;
    this.expression = expression;
  }
  /* eslint-disable */
  analyze(context) {
    // console.log(this);
    // this.value = this.expression.value
    // console.log(this);
    // this.field =
    // console.log("Am I happening");
    // console.log(this.expression instanceof StringLiteral);
    this.type = context.lookupFieldType(this.expression);
    // this.type =


    // need to be able to analyze whether or not a
    // called field exists
  }
  /* eslint-enable */

  optimize() {
    return this;
  }
};
