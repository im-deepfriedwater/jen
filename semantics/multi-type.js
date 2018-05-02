// Used exclusively for functions with multiple return types.
// Eventually we will build this into the other parts of the code such as
// variable assignment, where we have a more hard coded solution for
// multi variable type checking.

// Very empty as of now.
class MultiType {
  constructor(returnTypes) {
    Object.assign(this, { returnTypes });
  }
}

module.exports = MultiType;
