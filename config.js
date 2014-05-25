/*
 *  Application Configuration Settings
 *
 */
var fs = require("fs");
var debug = require('debug')('sitewords:config');

if(!('NODE_ENV' in process.env) || !(process.env['NODE_ENV'])) {
	try {
		process.env['NODE_ENV'] = String(fs.readFileSync(__APP_ROOT_PATH + '/.node_env')).trim();
	} catch(ignore) {}

    if(!(process.env['NODE_ENV'])) {
        debug("NODE_ENV not defined in either .node_env or process.env; defaulting to development!");
        process.env['NODE_ENV'] = 'development';
    }
}

/*
*  performance modeling and heap sanpshots install nodetime
*  npm install nodetime
*
*  if (process.env['NODE_ENV'].toLowerCase() === 'development') {
*  	require('nodetime').profile({
*  		accountKey: '###',
*  		appName: 'Node.js Application'
*  	});
*  }
*/

debug("exporting config %s", process.env['NODE_ENV']);

var config = {
	/*
     * Development Config - *.local
     */
    development: {
		logFormat: ':date HTTP/:http-version \x1b[1m:status\x1b[0m :method :req[Host] :url :res[Content-Length] bytes sent in :response-time ms',
        server: {
            user:		'node',
            group:  	'node',
            address:	'127.0.0.1',
            port:		8080
        },
        databases: {
            mysql: {
                sitewords: {
                    db:         		'sitewords',
                    host:       		'127.0.0.1',
                    port:       		3306,
                    user:			'user',
                    password:	'pass'
                }
            },
            mongo: {
                sitewords: {
                    collection: 	'sitewords',
                    host:       		'127.0.0.1',
                    port:       		27017,
                    username:	'user',
                    password:	'pass'
                }
            }
        }
    },
    /*
     * Test Config - mocha / supertest
     */
    test: {
		logFormat: ':date HTTP/:http-version \x1b[1m:status\x1b[0m :method :req[Host] :url :res[Content-Length] bytes sent in :response-time ms',
        server: {
            user:		'node',
            group:		'node',
            address:	'127.0.0.1',
            port:       	'8080'
        },
        databases: {
            mysql: {
                sitewords: {
                    db:         		'sitewords',
                    host:       		'127.0.0.1',
                    port:       		3306,
                    user:			'user',
                    password:	'pass'
                }
            },
            mongo: {
                sitewords: {
                    collection: 	'sitewords',
                    host:       		'127.0.0.1',
                    port:       		27017,
                    username:	'user',
                    password:	'pass'
                }
            }
        }
    },

    /*
     * Staging Config -
     */
    staging: {
		logFormat: ':date HTTP/:http-version \x1b[1m:status\x1b[0m :method :req[Host] :url :res[Content-Length] bytes sent in :response-time ms',
        server: {
            user:		'node',
            group:      'node',
            address:	'???.???.???.???',
            port:		80
        },
        databases: {
            mysql: {
                sitewords: {
                    db:         		'sitewords',
                    host:       		'127.0.0.1',
                    port:       		3306,
                    user:			'user',
                    password:	'pass'
                }
            },
            mongo: {
                sitewords: {
                    collection: 	'sitewords',
                    host:       		'127.0.0.1',
                    port:       		27017,
                    username:	'user',
                    password:	'pass'
                }
            }
        }
    },
    /*
     * Production Config -
     */
    production: {
		logFormat: ':date HTTP/:http-version \x1b[1m:status\x1b[0m :method :req[Host] :url :res[Content-Length] bytes sent in :response-time ms',
        server: {
            user:       	'node',
            group:      'node',
            address:	'???.???.???.???',
            port:       	80
        },
        databases: {
            mysql: {
                sitewords: {
                    db:         		'sitewords',
                    host:       		'127.0.0.1',
                    port:       		3306,
                    user:			'user',
                    password:	'pass'
                }
            },
            mongo: {
                sitewords: {
                    collection: 	'sitewords',
                    host:       		'127.0.0.1',
                    port:       		27017,
                    username:	'user',
                    password:	'pass'
                }
            }
        }
    }
};

module.exports = config[process.env['NODE_ENV']];
