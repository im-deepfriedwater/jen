const ListType = require('./list-type');

module.exports = class ListExpression {
  constructor(values) {
    Object.assign(this, { values });
  }

  analyze(context) {
    this.values.forEach(v => v.analyze(context));
    this.type = new ListType(this.values);
    this.type.analyze(context);
  }

  optimize() {
    return this;
  }
};
