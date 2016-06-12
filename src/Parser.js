import StringParser from './StringParser'
import ObjectParser from './ObjectParser'
import ArrayParser from './ArrayParser'
import NumberParser from './NumberParser'
import DateParser from './DateParser'
import BooleanParser from './BooleanParser'
import AllOfParser from './AllOfParser'
import EnumParser from './EnumParser'
import Chance from 'chance';
const chance = new Chance();


// var StringParser = require('../Parsers/StringParser')
// var ObjectParser = require('../Parsers/ObjectParser')
// var ArrayParser = require('../Parsers/ArrayParser')
// var NumberParser = require('../Parsers/NumberParser')
// var DateParser = require('../Parsers/DateParser')
// var BooleanParser = require('../Parsers/BooleanParser')
// var AllOfParser = require('../Parsers/AllOfParser')
// var EnumParser = require('../Parsers/EnumParser')
// var Chance = require('chance')
// var chance = new Chance();

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
            new BooleanParser(),
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