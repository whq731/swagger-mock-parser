'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

var chance = new _chance2['default']();

var ObjectParser = (function () {
    function ObjectParser(parser) {
        _classCallCheck(this, ObjectParser);

        this.cache = [];
        this.parser = parser;
    }

    _createClass(ObjectParser, [{
        key: 'canParse',
        value: function canParse(node) {
            return !!node.properties || node.type === 'object';
        }
    }, {
        key: 'parse',
        value: function parse(node) {
            return this.generateObject(node);
        }
    }, {
        key: 'generateObject',
        value: function generateObject(node) {
            var ret = {};
            var schema = Object.assign({}, node);
            schema = schema.properties;
            this.cache.push(node);
            for (var k in schema) {
                // detect and fix circular references in schema and return null object
                if (this.cache.filter(function (cacheObj) {
                    return node == cacheObj;
                }).length > 2) {
                    ret[k] = {};
                    this.cache.pop();
                    return ret;
                } else {
                    ret[k] = this.parser.parse(schema[k]);
                }
            }
            return ret;
        }
    }]);

    return ObjectParser;
})();

exports['default'] = ObjectParser;
module.exports = exports['default'];