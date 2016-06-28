'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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

var chance = new _chance2['default']();

var Parser = (function () {
    function Parser() {
        _classCallCheck(this, Parser);
    }

    _createClass(Parser, [{
        key: 'getParser',
        value: function getParser(node) {
            var parser = this.findParser(function (p) {
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
        key: 'findParser',
        value: function findParser(predicate) {
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