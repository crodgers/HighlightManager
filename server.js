const app = require('express')();
const routes = require('./routes');

//  Connect all our routes to our application
app.use('/', routes);

app.listen(process.env.PORT || 8081, process.env.IP || "0.0.0.0", function(){
  console.log("running");
});
