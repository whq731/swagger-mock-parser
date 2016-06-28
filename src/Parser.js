import StringParser from './Parsers/StringParser'
import ObjectParser from './Parsers/ObjectParser'
import ArrayParser from './Parsers/ArrayParser'
import NumberParser from './Parsers/NumberParser'
import DateParser from './Parsers/DateParser'
import BooleanParser from './Parsers/BooleanParser'
import AllOfParser from './Parsers/AllOfParser'
import EnumParser from './Parsers/EnumParser'
import Chance from 'chance';
const chance = new Chance();


export default class Parser {
    get parsers() {
        return this._parsers || (this._parsers = [
            new EnumParser(),
            new StringParser(),
            new ObjectParser(this),
            new ArrayParser(this),
            new AllOfParser(this),
            new NumberParser(),
            new BooleanParser(),
            new DateParser(),
            new BooleanParser()
        ]);
    }

    getParser(node) {
        let parser = this.findParser(p => p.canParse(node));

        if (!parser)
            throw new Error(`Can't handle ${node.type || 'Unknown'} type.`);

        return parser;
    }

    parse(node) {
        return this.getParser(node).parse(node);
    }
    findParser(predicate){
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        var list = this.parsers;
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return value;
            }
        }
        return undefined;

    }
}