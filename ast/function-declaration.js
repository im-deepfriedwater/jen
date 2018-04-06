const FunctionObject = require('./function-object');

// A function declaration binds a function object to a name.
module.exports = class FunctionDeclaration {
  constructor(annotation, signature, suite) {
    [this.id] = /^.*(?=:)/i.exec(annotation);
    [this.inputTypes, this.outputTypes] = this.parseTypes(annotation);
    this.params = this.parseParams(signature);

    this.function =
      new FunctionObject(this.id, this.inputTypes, this.outputTypes, this.params, suite);
  }
  /* eslint-disable class-methods-use-this */
  parseTypes(annotation) {
    // Grab all the input types, and split them into an array of strings
    // by the comma. We're also going to remove whitespaces in each string.
    const inputTypes = annotation
      .slice(annotation.indexOf(':') + 1, annotation.indexOf('-'))
      .split(',')
      .map(s => s.trim());
    // We do similarly for output types, instead slicing from the >
    const outputTypes = annotation
      .slice(annotation.indexOf('>') + 1)
      .split(',')
      .map(s => s.trim());

    return [inputTypes, outputTypes];
  }

  parseParams(signature) {
    return signature
      .slice(signature.indexOf('(') + 1, signature.indexOf(')'))
      .split(',')
      .map(s => s.trim());
  }
  analyze(context) {
    // First put the function in the current context, then analyze it in
    // a new child context.
    context.add(this.function);
    this.function.analyze(context.createChildContextForFunctionBody(this));
  }
};
