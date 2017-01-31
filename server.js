const app = require('express')();
const router = require('express').Router();
const session = require('express-session');
const dbStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
// const morgan = require('morgan');

//connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

const sessionStore = new dbStore(
  {
    mongooseConnection: mongoose.connection,
    collection: 'highlightSessions'
  });


app.use(session({
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  resave: true,
  saveUninitialized: true
}));

// app.use(morgan('combined'));

app.use(bodyParser.json());

//configure passport
app.use(passport.initialize());
require('./config/passport')(passport);
app.use(passport.session());

//  Connect all our routes to our application
require('./routes')(router, passport);
app.use(router);

var server = app.listen(process.env.PORT || 8081, process.env.IP || "0.0.0.0", function(){
  console.log("running on port", process.env.PORT || 8081 );
});

module.exports = server;
