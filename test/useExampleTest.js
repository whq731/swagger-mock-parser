var Parser = require('../dist/Parser');
var parser = new Parser({useExample: true});
console.log(parser.parse({type: 'string', example: 'useExample success'}))
