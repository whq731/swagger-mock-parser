import Chance from 'chance';
const chance = new Chance();

export default class ObjectParser {
    constructor(parser) {
        this.cache = [];
        this.parser = parser;
    }
    canParse(node) {
        return !!node.properties || node.type === 'object';
    }

    parse(node) {
        return this.generateObject(node);
    }

    generateObject(node) {
        var ret = {};
        var schema = Object.assign({}, node);
        schema = schema.properties;
        this.cache.push(schema);
        // if is not swagger object type return null object
        if (schema) {
            var hasCircular = this.cache.filter(function (cacheObj) {
                    return schema == cacheObj;
                }).length > 1
            for (var k in schema) {
                // detect and break circular references in schema
                if (hasCircular) {
                    schema[k] = JSON.parse(JSON.stringify(schema[k]));
                    ret[k] = this.parser.parse(schema[k]);
                    hasCircular = false;
                    this.cache.pop();
                    break;
                }
                if(this.parser.options && this.parser.options.useObjectKey){
                    schema[k]._objectKey = k;
                }
                ret[k] = this.parser.parse(schema[k]);
            }
        }
        return ret;
    }
}