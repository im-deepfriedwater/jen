const fs = require('fs');
const parse = require('../syntax/parser');


// declaration
let dec = parse("sad := true");

// const declaration
let constDec = parse("RICH := (4 + 3) * 2");

// assignment
let ass = parse("sad = \"woof\"");

// or
let or = parse("big := (3 > 1) || !true");

const util = require('util');

console.log(util.inspect(dec, {showHidden: false, depth: null}));
console.log(util.inspect(constDec, {showHidden: false, depth: null}));
console.log(util.inspect(ass, {showHidden: false, depth: null}));
console.log(util.inspect(or, {showHidden: false, depth: null}));
