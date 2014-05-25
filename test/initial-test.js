var expect = require('chai').expect;
var should = require('chai').should();

var config = require('./config.js');
var request = require('supertest');
var app = require(__APP_ROOT_PATH+'/app.js');

describe('HTTP', function(){
	request = request(app);

	/*
	 * ON DB conn support
	 *
    before(function(done) {
		if (app.ready) {
			return done();
		}
		process.on('preinit-ready', function() {
			app.ready = true;
			done();
		});
    });
    */

	describe('GET', function(){

		it('can get / uri', function(done){
			request
				.get('/')
				.set('Accept', 'text/html')
				.expect('Content-Type', /html/)
				.expect(/.+/) // response body is  not empty
				.expect(200, done);
		});

		it('can get /crawl/:uri uri', function(done){
			request
				.get('/crawl/test')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(/.+/) // response body is  not empty
				.expect(200, done);
		});

		it('can get /ping uri', function(done){
			request
				.get('/')
				.set('Accept', 'text/html')
				.expect('Content-Type', /html/)
				.expect(/.+/) // response body is  not empty
				.expect(200, done);
		});

	});

});
