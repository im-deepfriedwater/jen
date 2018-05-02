const Variable = require('./variable');

module.exports = class FunctionObject {
  constructor(id, paramTypes, resultTypes, params, suite) {
    Object.assign(this, {
      id, paramTypes, resultTypes, params, suite,
    });
  }

  // Functions like print and sqrt which are pre-defined are known as
  // "external" functions because they are not declared in the current
  // module and we therefore don't generate code for them.
  get isExternal() {
    return !this.function.suite;
  }

  analyze(context) {
    // Each parameter will be declared in the function's scope, mixed in
    // with the function's local variables. This is by design.

    // create a new variable and give it a
    this.params.forEach((p, i) => {
      const v = new Variable(p, this.paramTypes[i]);
      this.params[i] = v;
      context.add(v);
    });

    // Make sure all required parameters come before optional ones, and
    // gather the names up into sets for quick lookup.
    // this.requiredParameterNames = new Set();
    this.allParameterNames = new Set();
    this.params.forEach((p) => {
      this.allParameterNames.add(p.id);
    });

    // Now we analyze the body with the local context. Note that recursion is
    // allowed, because we've already inserted the function itself into the
    // outer context, so recursive calls will be properly resolved during the
    // usual "outward moving" scope search. Of course, if you declare a local
    // variable with the same name as the function inside the function, you'll
    // shadow it, which would probably be not a good idea.
    if (this.suite.length > 0) {
      this.suite.analyze(context);
    }
  }

  optimize() {
    this.params.forEach(p => p.optimize());
    this.suite.optimize();
    this.suite = this.suite.filter(s => s !== null);
    // Suggested: Look for returns in the middle of the body
    return this;
  }
};
