const FunctionObject = require('./function-object');

// A function declaration binds a function object to a name.
module.exports = class FunctionDeclaration {
  constructor(annotation, signature, suite) {
    Object.assign(this, { annotation, signature, suite });
    this.function =
      new FunctionObject(
        this.annotation.id,
        this.annotation.paramTypes,
        this.annotation.resultTypes,
        this.signature.params,
        suite,
      );
  }

  analyze(context) {
    // First put the function in the current context, then analyze it in
    // a new child context.
    if (this.signature.id !== this.annotation.id) {
      throw new Error('Function ID mismatch in signature and annotation.');
    }
    if (this.annotation.paramTypes[0] === 'void') {
      if (this.signature.params > 0 || this.annotation.paramTypes > 1) {
        throw new Error('Function type void has more than one parameter or input type.');
      }
    } else if (this.signature.params.length !== this.annotation.paramTypes.length) {
      throw new Error('Function parameter number mismatch in signature and annotation.');
    }
    context.add(this.function);
    this.function.analyze(context.createChildContextForFunctionBody(this));
  }
};
