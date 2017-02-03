const env = require('node-env-file');
const request = require('supertest');

env('.test_env')
process.env.NODE_ENV = 'test';
const baseUrl = "https://0.0.0.0:8080";

describe('root route', function () {
    var server;
    beforeEach(() => {
        server = require('../server');
    });

    afterEach((done) => {
        server.close(done);
    });

    it('status code should be 200', (done) => {
        request(server).get('/')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
            });
        done();
    });
});

describe('highlights route', function () {
   var server;
    beforeEach(() => {
        server = require('../server');
    });

    afterEach((done) => {
        server.close(done);
    });
   
   it('should redirect with 302', (done) => {
        request(server).get('/highlights')
            .expect(302)
            .end((err, res) => {
                if (err) throw err;
            });
        done();
    }) 
});