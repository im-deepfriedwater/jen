const Type = require('./type');
const ListType = require('./list-type');

module.exports = class Accessor {
  constructor(object, property) {
    Object.assign(this, { object, property });
  }

  analyze(context) {
    this.object.analyze(context);
    // TODO move this into a less hard coded solution.
    if (this.property === 'length') {
      if (!(this.object.type instanceof ListType)) {
        throw new Error('Length property used on non-list type');
      }
      this.type = Type.NUMBER;
    }
  }

  optimize() {
    this.object = this.object.optimize();
    this.property = this.property.optimize();
    return this;
  }
};
