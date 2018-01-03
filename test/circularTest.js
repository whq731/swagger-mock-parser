var fs = require('fs') ;
var swaggerParser = require('swagger-jsblade-swagger-parser');
var mockParser = require('../dist/Parser');
function run(swaggerFile, mockFile, cb) {
    let parserPromise = new Promise((resolve) => {
            swaggerParser.dereference(swaggerFile, (err, swagger) => {
            if (err) throw err;
            resolve(swagger);
        });
    });
    parserPromise.then((api) => {
        let paths = api.paths;
    try {
        for (let path in paths) {
            if (paths.hasOwnProperty(path)) {
                for (let action in paths[path]) {
                    if (paths[path].hasOwnProperty(action)) {
                        if (paths[path][action].responses) {
                            for (let resCode in paths[path][action].responses) {
                                if (paths[path][action].responses.hasOwnProperty(resCode)) {
                                    let schema = paths[path][action].responses[resCode].schema;
                                    if (schema) {
                                        // if example is defined and not empty,on override just skip it
                                        if (schema.example && schema.example !== '') {
                                            continue;
                                        } else {
                                            schema.example = new mockParser({useExample: true, fixedArray: true, useObjectKey: true}).parse(schema);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
        console.log('done')
    } catch (e) {
        console.log(e)
    }
});

};
run('./test/crm.pc.swagger.json')