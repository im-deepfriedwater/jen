const fs = require('fs');
const parse = require('../syntax/parser');



let file = parse("lulu := true");
const util = require('util')

console.log(util.inspect(file, {showHidden: false, depth: null}))
