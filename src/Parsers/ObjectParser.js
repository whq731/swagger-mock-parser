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
                // detect and break circular references in schema and return null object
                if (hasCircular){
                    schema[k] = {};
                    hasCircular = false;
                    this.cache.pop();
                    break;
                } else {
                    ret[k] = this.parser.parse(schema[k]);
                }
            }
        }
        return ret;
    }
}