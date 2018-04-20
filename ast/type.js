class Type {
  constructor(name) {
    this.name = name;
    Type.cache[name] = this;
  }
  mustBeNumber(message) {
    return this.mustBeCompatibleWith(Type.NUMBER, message);
  }
  mustBeBoolean(message) {
    return this.mustBeCompatibleWith(Type.BOOLEAN, message);
  }
  mustBeString(message) {
    return this.mustBeCompatibleWith(Type.STRING, message);
  }
  mustBeError(message) {
    return this.mustBeCompatibleWith(Type.ERROR, message);
  }
  mustBeVoid(message) {
    return this.mustBeCompatibleWith(Type.VOID, message);
  }
  mustBeAny(message) {
    return this.mustBeCompatibleWith(Type.ANY, message);
  }
  mustBeCompatibleWith(otherType, message) {
    if (!this.isCompatibleWith(otherType)) {
      throw message;
    }
  }
  mustBeMutuallyCompatibleWith(otherType, message) {
    if (!(this.isCompatibleWith(otherType) || otherType.isCompatibleWith(this))) {
      throw message;
    }
  }
  isCompatibleWith(otherType) {
    // In more sophisticated languages, comapatibility would be more complex
    return this === otherType;
  }
}

Type.cache = {};

Type.BOOLEAN = new Type('boolean');
Type.NUMBER = new Type('number');
Type.ERROR = new Type('error');
Type.STRING = new Type('string');
Type.VOID = new Type('void');
Type.ANY = new Type('any');

Type.forName = name => Type.cache[name];


module.exports = Type;
