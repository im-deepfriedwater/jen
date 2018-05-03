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
const FieldType = require('../ast/field-type');
const RecordType = require('../ast/record-type');


class Context {
  constructor({ parent = null, currentFunction = null, inLoop = false } = {}) {
    Object.assign(this, {
      parent,
      currentFunction,
      inLoop,
      declarations: Object.create(null),
      sumTypeDeclarations: Object.create(null),
      recordTypeDeclarations: Object.create(null),
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
  }

  // Returns the entity bound to the given identifier, starting from this
  // context and searching "outward" through enclosing contexts if necessary.
  lookup(id) {
    if (id in this.declarations) {
      // console.log(this.declarations[id]);
      return this.declarations[id];
    } else if (this.parent === null) {
      throw new Error(`Identifier ${id} has not been declared`);
    } else {
      return this.parent.lookup(id);
    }
  }

  lookupRecordField(id, field) {
    let fieldObject;
    if (id in this.declarations) {
      if (this.declarations[id].type instanceof RecordType) {
        Object.keys(this.declarations[id].type.fields).forEach((fieldId) => {
          if (this.declarations[id].type.fields[fieldId].id === field) {
            fieldObject = this.declarations[id].type.fields[fieldId];
          }
        });
        if (fieldObject instanceof FieldType) {
          return fieldObject;
        }
        throw new Error(`Identifier ${id} is not a Field Type`);
      }
      throw new Error(`Field ${field} in identifier ${id} has not been declared`);
    } else if (this.parent === null) {
      throw new Error(`Identifier ${id} has not been declared`);
    } else {
      return this.parent.lookup(id);
    }
  }

  // These two methods lookup and lookupSumType are very similar. These two
  // could possibly be cleaned up later.

  // Similar to looking up entities bound to an identifier but specifically for
  // type declarations. Note, sum types also search outward through enclosing
  // contexts if necessary.
  lookupSumType(sumTypeId) {
    if (sumTypeId in this.sumTypeDeclarations) {
      return this.sumTypeDeclarations[sumTypeId];
    } else if (this.parent === null) {
      throw new Error(`Type identifier ${sumTypeId} has not been declared`);
    } else {
      return this.parent.lookupSumType(sumTypeId);
    }
  }

  lookupFieldType(expression) {
    // console.log(this);
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

  assertInLoop(message) {
    if (!this.inLoop) {
      throw new Error(message);
    }
  }

  assertRecordNoDuplicateFields(record, message) { // eslint-disable-line class-methods-use-this
    const uniqueFields = new Set();
    record.fields.forEach((f) => {
      if (uniqueFields.has(f.id)) {
        throw new Error(message);
      }
      uniqueFields.add(f.id);
    });
  }

  assertIsField(nameOfRecord, field) { // eslint-disable-line class-methods-use-this
    const currentRecord = this.lookup(nameOfRecord);
    const fieldTest = currentField => currentField === field;
    return currentRecord.fields.some(fieldTest);
  }

  addSumType(id, sumType) {
    this.sumTypeDeclarations[id] = sumType;
  }
}
Context.INITIAL = new Context();
new FunctionDeclaration(new Annotation('print', ['any'], ['void']), new Signature('print', ['input']), []).analyze(Context.INITIAL);
new FunctionDeclaration(new Annotation('sqrt', ['number'], ['number']), new Signature('sqrt', ['x']), []).analyze(Context.INITIAL);
new FunctionDeclaration(new Annotation('pi', ['void'], ['number']), new Signature('pi', []), []).analyze(Context.INITIAL);
new FunctionDeclaration(new Annotation('toUpper', ['string'], ['string']), new Signature('toUpper', ['stringToUpper']), []).analyze(Context.INITIAL);

module.exports = Context;
