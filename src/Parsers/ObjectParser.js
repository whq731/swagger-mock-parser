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
        var schema = Object.assign({},node);
        schema = schema.properties;
        this.cache.push(node);
        for (var k in schema) {
            // detect and fix circular references in schema and return null object
            if (this.cache.filter(cacheObj => { return node == cacheObj}).length > 2) {
                ret[k] = {};
                this.cache.pop();
                return ret;
            } else {
                ret[k] = this.parser.parse(schema[k]);
            }
        }
        return ret;
    }
}