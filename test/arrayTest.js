var Parser = require('../dist/Parser');
var parser = new Parser({fixedArray: true});
console.log('fixed Array:' + parser.parse({type: 'array', items: {type: 'string'}}));
parser = new Parser();
console.log('default random Array:' + parser.parse({type: 'array', items: {type: 'string'}}));