
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , Database = require('./lib/db')
  , less = require('less')
  , util = require('util');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  // setup us the database
  db = new Database('./roommates-test.db');
  db.load(function() {
    console.log(' database internal: %s', util.inspect(db));
  });
  
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  // setup us the database
  db = new Database('./roommates.db');
  db.load();

  app.use(express.errorHandler()); 
});

// Routes

app.get('/', routes.index);
app.get('/newUser', routes.newUser);
app.post('/addUser', routes.addUser);
app.post('/addWeight', routes.addWeight);

var port = process.env.PORT || 3000;
app.listen(port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
console.log(' database: %s', db.path);
