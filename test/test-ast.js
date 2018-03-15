const fs = require('fs');
const parse = require('../syntax/parser');


// declaration
let dec = parse("sad := true");

// const declaration
let constDec = parse("RICH := false");

// assignment
let ass = parse("sad = false")


const util = require('util')

console.log(util.inspect(dec, {showHidden: false, depth: null}));
console.log(util.inspect(constDec, {showHidden: false, depth: null}));
console.log(util.inspect(ass, {showHidden: false, depth: null}));
