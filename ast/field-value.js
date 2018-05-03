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
    // console.log(context);
    // console.log(this);
    // context.add(this);
    // this.test = context.lookupRecordField(this.id);
    // console.log('did it work');
    // console.log(this.test);
    // console.log('probably not');
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
