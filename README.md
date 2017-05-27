# swagger-mock-parser
A parser for swagger object properties ,mock data returned by chancejs

##changeLog
 version 1.1.8 change: add useExample option,set this true parser will return defined example first
 version 1.1.7 break change: return string instead of throw error,objectParser canParse add "node.type == object" judge condition


## usage

An example for mocking swagger definition schema

```javascript
// basic usage
var Parser = require('swagger-mock-parser')
var parser = new Parser();
var schema = definition.schema;
return parser.parse(schema);

// useExample option
var Parser = require('swagger-mock-parser')
// set useExample true will return every property's example which has already defined
var parser = new Parser({useExample: true});
var schema = {type: 'string', example: 'will return example first'}
return parser.parse(schema);

```


## Specifying custom Chance options

Swagger specifies only a few primitive types; for scenarios where specific chance methods are needed, use the `x-chance-type` field.

```yaml
...
definitions:
  NewPet:
    properties:
      name:
        type: string
        x-chance-type: name
      tag:
        type: string
        x-chance-type: guid
```


Most of the chance methods allow some fine-tuning of the returned data.  For example, the [integer](http://chancejs.com/#integer) method allows specification of minimum and maximum output values.  These options can be configured in the Swagger YAML file with the `x-chance-options` block:

```yaml
...
definitions:
  Pet:
    allOf:
      - $ref: '#/definitions/NewPet'
      - required:
        - id
        properties:
          id:
            type: integer
            format: int64
            x-type-options:
              min: 1
              max: 1000
```

## A note on types:

All of the primitive types defined in the [Swagger specification](https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md#data-types) are supported except for `file` and `password`.  Currently, the `format` property is ignored; use `x-chance-type` instead.  The server will error on any request with a type other than one of the primitive types if there is no valid x-chance-type also defined.

### Returning Fixed Values

Although not a chance method, support has been added for returning fixed values using `x-chance-type: fixed`.  Any value given for the custom tag `x-type-value` will be returned; below is an example where an object is returned:

```yaml
    status:
      type: object
      x-chance-type: fixed
      x-type-value:
        type: 'adopted'
```