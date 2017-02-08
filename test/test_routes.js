const env = require('node-env-file');
const session = require('supertest-session');
const should = require('should');

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

describe('unauthorized routes', function () {
    var server;
    beforeEach(() => {
        server = require('../server');
        testSession = session(server);
    });

    afterEach((done) => {
        server.close(done);
        testSession = null;
    });
   
   it('highlights should redirect with 302 if no authorized user', (done) => {
        testSession.get('/highlights')
            .expect(302)
            .expect('Location', '/')
            .end((err, res) => {
                if (err) return done(err);
            });
        done();
    });
    
    it('highlight should redirect with 302 if no authorized user', (done) => {
        testSession.get('/highlight/2')
            .expect(302)
            .end((err, res) => {
                if (err) return done(err);
            });
        done();
    });
});

// describe('authorized routes', function () {
//     var server;
//     beforeEach(() => {
//         server = require('../server');
//         testSession = session(server, {
//             before: (req) => {
//                 req.isAuthenticated = () => {
//                     return true;
//                 };
//             }
//         });
//     });

//     afterEach((done) => {
//         server.close(done);
//         testSession = null;
//     });
    
//     it('should redirect to /highlights if authorized', (done) => {
//         testSession.get('/highlights')
//             .expect(200)
//             .expect('Location', '/highlights')
//             .end((err, res) => {
//               if (err) return done(err);
//             });
//         done();
//     });
// });