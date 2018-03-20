/* eslint-disable */

const fs = require('fs');
const parse = require('../syntax/parser');

// not
const not = parse('bang := !true');

// declaration
const dec = parse('sad := true && false');

// const declaration
const constDec = parse('RICH := (4 + 3 + 1) * 2');

// assignment
const ass = parse('sad = "woof"');

// or
const or = parse('big := (3 > 1) || !true');

const util = require('util');

console.log(util.inspect(not, { showHidden: false, depth: null }));
console.log(util.inspect(dec, { showHidden: false, depth: null }));
console.log(util.inspect(constDec, { showHidden: false, depth: null }));
console.log(util.inspect(ass, { showHidden: false, depth: null }));
console.log(util.inspect(or, { showHidden: false, depth: null }));
