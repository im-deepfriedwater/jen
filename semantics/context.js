/*
 * Credit to @rtoal
 * https://github.com/rtoal/plainscript
 * Semantic Analysis Context
 *
 * A context object holds state for the semantic analysis phase, such as the
 * enclosing function (if any), whether or not we are in a loop, a map of
 * declarations introduced in this scope, and the parent context.
 *
 *   const Context = require('./semantics/context');
 */

const FunctionObject = require('../ast/function-object');
const FunctionDeclaration = require('../ast/function-declaration');
const Annotation = require('../ast/annotation');
const Signature = require('../ast/signature');


class Context {
  constructor({ parent = null, currentFunction = null, inLoop = false } = {}) {
    Object.assign(this, {
      parent, currentFunction, inLoop, declarations: Object.create(null),
    });
  }

  createChildContextForFunctionBody(currentFunction) {
    // When entering a new function, we're not in a loop anymore
    return new Context({ parent: this, currentFunction, inLoop: false });
  }

  createChildContextForLoop() {
    // When entering a loop body, just set the inLoop field, retain others
    return new Context({ parent: this, currentFunction: this.currentFunction, inLoop: true });
  }

  createChildContextForBlock() {
    // For a simple block (i.e., in an if-statement), we have to retain both
    // the function and loop settings.
    return new Context({
      parent: this,
      currentFunction: this.currentFunction,
      inLoop: this.inLoop,
    });
  }

  // Call this to add a new entity (which could be a variable, a function,
  // or a parameter) to this context. It will check to see if the entity's
  // identifier has already been declared in this context. It does not need
  // to check enclosing contexts because in this language, shadowing is always
  // allowed. Note that if we allowed overloading, this method would have to
  // be a bit more sophisticated.
  add(entity) {
    if (entity.id in this.declarations) {
      throw new Error(`Identitier ${entity.id} already declared in this scope`);
    }
    this.declarations[entity.id] = entity;
    // // What if instead when declared, here if its a variable set property
  }

  // Returns the entity bound to the given identifier, starting from this
  // context and searching "outward" through enclosing contexts if necessary.
  lookup(id) {
    if (id in this.declarations) {
      // The idea here is it only will be false if its a variable that hasnt been used yet
      if (this.declarations[id].used === false) {
        this.declarations[id].used = true;
      }
      return this.declarations[id];
    } else if (this.parent === null) {
      throw new Error(`Identifier ${id} has not been declared`);
    } else {
      return this.parent.lookup(id);
    }
  }

  assertInFunction(message) {
    if (!this.currentFunction) {
      throw new Error(message);
    }
  }

  assertIsFunction(entity) { // eslint-disable-line class-methods-use-this
    if (entity.constructor !== FunctionObject) {
      throw new Error(`${entity.id} is not a function`);
    }
  }

  // Dont really know what to do with this. Its a function that is supposed to loop
  // through all the variables but I dont know where to call it or if its even right
  checkForUnusedDeclared() {
    for (let id = 0; id < this.declarations.length; id += 1) {
      if (!this.declarations[id].used) {
        // console.log('warning');
        throw new Error('Unused');
      }
    }
  }

  assertInLoop(message) {
    if (!this.inLoop) {
      throw new Error(message);
    }
  }
}

Context.INITIAL = new Context();
new FunctionDeclaration(new Annotation('print', ['any'], ['void']), new Signature('print', ['input']), []).analyze(Context.INITIAL);
new FunctionDeclaration(new Annotation('sqrt', ['number'], ['number']), new Signature('sqrt', ['x']), []).analyze(Context.INITIAL);

module.exports = Context;
