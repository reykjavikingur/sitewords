#!/usr/bin/env node

var debug = require('debug')('sitewords:server');
var http = require('http');
var util = require('util');
var path = require('path');
var fs = require("fs");


global['__APP_ROOT_PATH'] = __dirname;
global['__APP_MODELS_PATH'] = path.join(__dirname,'models');
global['__APP_VIEWS_PATH'] = path.join(__dirname,'views');
global['__APP_LIBS_PATH'] = path.join(__dirname,'libs');

global['__APP_PUBLIC_PATH'] = path.join(__dirname,'public');

debug('starting up...');

if(typeof process.setuid !== 'function') {
	// noop for windows -env !
	process.setuid = function(){};
}

if(typeof process.setgid !== 'function') {
	// noop for  windows -env !
	process.setgid = function(){};
}

var app = require('./app');
var server = http.createServer(app);

server.on('error', function(e){
	switch(e.code) {
		case 'EACCES':
			console.error("Fatal Error: Insufficient user privleges! Unable to access PORT: "+app.get('port'));
			process.exit(99);
			break;
		case 'EADDRINUSE':
			console.error("Fatal Error: Unable to bind to address: "+app.get('address')+":"+app.get('port'));
			process.exit(99);
			break;
		case 'EADDRNOTAVAIL':
			console.error("Fatal Error: Unable to bind to address: "+app.get('address')+":"+app.get('port'));
			process.exit(99);
		default:
			console.error('Fatal Error: ' + e.code );
			process.exit(99);
	}
});

server.on('listening', function(){
	console.warn("http server listening at " + app.get('address') + ":" + app.get('port'));
});

process.on('preinit-ready', function() {
	app.ready = true;
	server.listen(app.get('port'), app.get('address'), function(){
		try {
			process.setgid(app.get('group'));
			process.setuid(app.get('user'));
		} catch (ignore) {}
	});
});

// temporary - move this to db conn callback
process.emit('preinit-ready');
