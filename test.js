const parse = require('./syntax/parser');
const fs = require('fs');

// parse(fs.readFileSync('./test.jen', 'utf-8'));
parse(`while true:\n    if (1 < 2):\n        break`);
