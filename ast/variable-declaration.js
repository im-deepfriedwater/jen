const Variable = require('./variable');

// A VariableDeclaration declares one or more variables. The variable objects
// will be created during semantic analysis.
module.exports = class VariableDeclaration {
  // During syntax analysis (parsing), all we do is collect the variable names.
  // We will make the variable objects later, because we have to add them to a
  // semantic analysis context.
  constructor(ids, initializers) {
    Object.assign(this, { ids, initializers });
  }

  analyze(context) {
    // analyze first so functionCalls get analyzed
    this.initializers.forEach(e => e.analyze(context));

    // Checking if the right side is a function call
    // If so, count the number of return types and add it to initializerReturnCount
    const types = [];
    this.initializers.forEach((i) => {
      if (i.callee) {
        types.push(...(i.callee.referent.type));
      } else {
        types.push(i.type);
      }
    });

    if (this.ids.length !== types.length) {
      throw new Error('Number of variables does not equal number of initializers');
    }

    // We don't want the declared variables to come into scope until after the
    // declaration line, so we will analyze all the initializing expressions
    // first.

    // Now we can create actual variable objects and add to the current context.
    this.variables = this.ids.map((id, i) => new Variable(id, types[i]));
    this.variables.forEach(variable => context.add(variable));
  }

  optimize() {
    return this;
  }
};
