var test = require('ava');
var Parser = require('../dist/Parser');

test('fixed Array', t => {
    let parser = new Parser({fixedArray: true});
    let res = parser.parse({type: 'array', items: {type: 'string'}});
    t.is(Array.isArray(res) && res.length === 1, true);
});
test('default random Array', t => {
    let parser = new Parser();
    let res = parser.parse({type: 'array', items: {type: 'string'}});
    t.is(Array.isArray(res), true);
});      