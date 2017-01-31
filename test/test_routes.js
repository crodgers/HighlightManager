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
    })
    it('should return 200', (done) => {
        request(server).get('/').expect(200)
        done();
    });
});