const app = require('express')();
const session = require('express-session');
const dbStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const routes = require('./routes');

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

//  Connect all our routes to our application
app.use('/', routes);

app.listen(process.env.PORT || 8081, process.env.IP || "0.0.0.0", function(){
  console.log("running");
});
