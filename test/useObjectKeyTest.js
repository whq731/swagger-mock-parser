var Parser = require('../dist/Parser');
var parser = new Parser({useExample:true, useObjectKey: true});
console.log(parser.parse({
    type: 'object',
    properties: {
        objectKeyName: {type: 'string', example: 'useExample prior'}
    }
}))
console.log(parser.parse({
    type: 'object',
    properties: {
        objectKeyName: {type: 'string', example: ''}
    }
}))
