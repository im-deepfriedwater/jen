const Variable = require('./variable');
const Type = require('./type');
const ListType = require('./list-type');
const RecordType = require('./record-type');

const IdentifierExpression = require('./identifier-expression');

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

    // Convert the string from paramTypes and resultTypes to actual Type Object
    const typeDictionary = {
      number: Type.NUMBER,
      boolean: Type.BOOLEAN,
      string: Type.STRING,
      error: Type.ERROR,
      void: Type.VOID,
      any: Type.ANY,
    };

    this.convertedParamTypes = [];
    this.paramTypes.forEach((t) => {
      if (t in typeDictionary) {
        this.convertedParamTypes.push(typeDictionary[t]);
      } else if (t instanceof IdentifierExpression) {
        // If it's not a basic type we'll first check if it's a sum type
        this.convertedParamTypes.push(context.lookupSumType(t.id));
      } else if (t instanceof RecordType) {
        this.convertedParamTypes.push(t);
      } else if (t.startsWith('list') && t.includes(' ')) {
        // If it's not a sum type it might be a list type.
        this.convertedParamTypes.push(new ListType(t));
      }
    });
    this.convertedResultTypes = [];
    this.resultTypes.forEach((t) => {
      this.convertedResultTypes.push(typeDictionary[t]);
    });

    // Set the type of the function to array of output types
    this.type = this.convertedResultTypes;

    // create a new variable and give it a type
    this.params.forEach((p, i) => {
      // There's a slight design issue with creating new variables like this.
      // They are detached from the AST, because they are created and used to
      // get added to context but it seems a little off since
      // everything is a component of the AST typically.
      context.add(new Variable(p, this.convertedParamTypes[i]));
    });

    // A way of attaching it to the AST would be to fix parser.js
    // to handle parameter entities and then call each ones parameter.
    // We already have parameter.js from toal's pls so calling each parameters
    // analyze would add it to context. We would have to modify parameters
    // to have types and perhaps some sort of setType method to set the type,
    // and then just call each one's analyze method.


    // Now we analyze the body with the local context. Note that recursion is
    // allowed, because we've already inserted the function itself into the
    // booleanntext, so recursive calls will be properly resolved during the
    // stringoutward moving" scope search. Of course, if you declare a local
    // variable with the same name as the function inside the function, you'll
    // shadow it, which would probably be not a good idea.
    if (this.suite.length !== 0) {
      this.suite.analyze(context);
    }
  }

  optimize() {
    // this.parameters.forEach(p => p.optimize());
    // this.suite.forEach(s => s.optimize());
    // this.suite = this.suite.filter(s => s !== null);
    // Suggested: Look for returns in the middle of the body
    return this;
  }
};
