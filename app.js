
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
  //Setup us the database
  db = new Database('./test/roommates.db');
  db.load(function() {
    console.log(' database internal: %s', util.inspect(db));
  });
  
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', routes.index);
app.post('/addUser', routes.addUser);

// listening
app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
console.log(' database: %s', db.path);
