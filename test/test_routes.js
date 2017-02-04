const env = require('node-env-file');
const session = require('supertest-session');

var testSession = null;

env('.test_env')
process.env.NODE_ENV = 'test';

describe('root route', function () {
    var server;
    beforeEach(() => {
        server = require('../server');
        testSession = session(server);
    });

    afterEach((done) => {
        server.close(done);
        testSession = null;
    });

    it('status code should be 200', (done) => {
        testSession.get('/')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
            });
        done();
    });
});

describe('highlights route', function () {
    var server;
    beforeEach(() => {
        server = require('../server');
        testSession = session(server);
    });

    afterEach((done) => {
        server.close(done);
        testSession = null;
    });
   
   it('should redirect with 302 if no authorized user', (done) => {
        testSession.get('/highlights')
            .expect(302)
            .end((err, res) => {
                if (err) return done(err);
            });
        done();
    });
});

describe('highlight route', function () {
    var server;
    beforeEach(() => {
        server = require('../server');
        testSession = session(server);
    });

    afterEach((done) => {
        server.close(done);
        testSession = null;
    });
   
   it('should redirect with 302 if no authorized user', (done) => {
        testSession.get('/highlights')
            .expect(302)
            .end((err, res) => {
                if (err) return done(err);
            });
        done();
    });
});