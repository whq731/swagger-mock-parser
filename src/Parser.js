import StringParser from './Parsers/StringParser'
import ObjectParser from './Parsers/ObjectParser'
import ArrayParser from './Parsers/ArrayParser'
import NumberParser from './Parsers/NumberParser'
import DateParser from './Parsers/DateParser'
import BooleanParser from './Parsers/BooleanParser'
import AllOfParser from './Parsers/AllOfParser'
import EnumParser from './Parsers/EnumParser'
import Chance from 'chance';
import "babel-polyfill";
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
        let parser = this.parsers.find(p => p.canParse(node));

        if (!parser)
            throw new Error(`Can't handle ${node.type || 'Unknown'} type.`);

        return parser;
    }

    parse(node) {
        return this.getParser(node).parse(node);
    }
}