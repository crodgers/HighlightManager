var AmazonStrategy = require('passport-amazon').Strategy;
var User = require('../models/user');

module.exports = (passport) => {
    passport.serializeUser(function(user, done) {
      done(null, user);
    });
    
    passport.deserializeUser(function(obj, done) {
      done(null, obj);
    });

    passport.use(
        new AmazonStrategy({
            clientID: process.env.AMAZON_CLIENT_ID,
            clientSecret: process.env.AMAZON_CLIENT_SECRET,
            callbackURL: process.env.AMAZON_AUTH_CALLBACK
        },
        (accessToken, refreshToken, profile, done) => {
            process.nextTick(() => {
                console.log('in the callback for amazon auth');
                User.findOrCreate({
                    amazonId: profile.id,
                    username: profile.displayName
                }, (err, user, created) => {
                    if (err)
                        return done(err);
                    console.log(user.username);
                    return done(null, user);
                });
                
            })
        })
    );
};