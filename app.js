
/**
 * Module dependencies.
 *
 */
var fs = require('fs'),
	config = require('./config.js'),
	express = require('express'),
	AppError = require(__APP_LIBS_PATH + '/AppError.js'),
	errorHandler = require(__APP_LIBS_PATH + '/errorHandler.js'),
	compress = require('compression'),
    favicon = require('serve-favicon'),
	morgan  = require('morgan');

var debug = require('debug')('sitewords:app');


/**
 * Export the app instance so server.js has access
 *
 * @see http://nodejs.org/api/modules.html
 */
var app = module.exports = express();
app.ready = false;
app.disable('x-powered-by');

app.use(compress());
app.use(express.static(__APP_PUBLIC_PATH));
app.use(favicon(__APP_PUBLIC_PATH + '/favicon.ico'));

/*
 *	Connect DBs - on an all connected callback emit a 'preinit-ready' event on process.
 *
 */


for(var name in config.server) {
    if(config.server.hasOwnProperty(name)) {
        app.set(name, config.server[name]);
    }
}


app.set('views', __APP_VIEWS_PATH);
app.set('view engine', 'jade');

app.use(morgan({format: config.logFormat}));


/**
 * activate http routes
 *
 */

app.route('/').all(function(req, res){
	res.render('index', { title: 'SiteWords' });
	debug('rendered index view.')
});

app.route('/crawl/:uri').get(function(req, res){
	res.send({data: true});
	debug('rendered crawl data view.')
});

app.route('/ping').all(function(req, res){
	res.render('ping', { title: 'SiteWords - PING' });
	debug('rendered ping view.');
});



// If we get here - nothing else handled us so trigger the errorHandler with a status 404. (ALWAYS place at the 2nd to last middleware)
app.use(function(req, res, next){
	next( new AppError("Resource not found! " + req.url.replace(/[\?\#].*$/, ''), 404) );
});

// The errorHandler plugin (ALWAYS place at the very last middleware)
errorHandler.title = 'sitewords';
app.use(errorHandler);

