'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _ParsersStringParser = require('./Parsers/StringParser');

var _ParsersStringParser2 = _interopRequireDefault(_ParsersStringParser);

var _ParsersObjectParser = require('./Parsers/ObjectParser');

var _ParsersObjectParser2 = _interopRequireDefault(_ParsersObjectParser);

var _ParsersArrayParser = require('./Parsers/ArrayParser');

var _ParsersArrayParser2 = _interopRequireDefault(_ParsersArrayParser);

var _ParsersNumberParser = require('./Parsers/NumberParser');

var _ParsersNumberParser2 = _interopRequireDefault(_ParsersNumberParser);

var _ParsersDateParser = require('./Parsers/DateParser');

var _ParsersDateParser2 = _interopRequireDefault(_ParsersDateParser);

var _ParsersBooleanParser = require('./Parsers/BooleanParser');

var _ParsersBooleanParser2 = _interopRequireDefault(_ParsersBooleanParser);

var _ParsersAllOfParser = require('./Parsers/AllOfParser');

var _ParsersAllOfParser2 = _interopRequireDefault(_ParsersAllOfParser);

var _ParsersEnumParser = require('./Parsers/EnumParser');

var _ParsersEnumParser2 = _interopRequireDefault(_ParsersEnumParser);

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

require("babel-polyfill");

var chance = new _chance2['default']();

var Parser = (function () {
    function Parser() {
        _classCallCheck(this, Parser);
    }

    _createClass(Parser, [{
        key: 'getParser',
        value: function getParser(node) {
            var parser = this.parsers.find(function (p) {
                return p.canParse(node);
            });

            if (!parser) throw new Error('Can\'t handle ' + (node.type || 'Unknown') + ' type.');

            return parser;
        }
    }, {
        key: 'parse',
        value: function parse(node) {
            return this.getParser(node).parse(node);
        }
    }, {
        key: 'parsers',
        get: function get() {
            return this._parsers || (this._parsers = [new _ParsersEnumParser2['default'](), new _ParsersStringParser2['default'](), new _ParsersObjectParser2['default'](this), new _ParsersArrayParser2['default'](this), new _ParsersAllOfParser2['default'](this), new _ParsersNumberParser2['default'](), new _ParsersBooleanParser2['default'](), new _ParsersDateParser2['default'](), new _ParsersBooleanParser2['default']()]);
        }
    }]);

    return Parser;
})();

exports['default'] = Parser;
module.exports = exports['default'];