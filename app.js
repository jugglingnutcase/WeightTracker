
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , level = require('level')
  , less = require('less')
  , util = require('util')
  , fs = require('fs');

var app = express();

// Configuration

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
  // setup us the db
  db = level('./db/roommates-test.db', {
    'valueEncoding': 'json'
  });

  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }))
});

app.configure('production', function() {
  // setup us the db
  db = level('./db/roommates.db', {
    'valueEncoding': 'json'
  });

  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/newUser', routes.newUser);
app.post('/addUser', routes.addUser);
app.post('/addWeight', routes.addWeight);

var port = process.env.PORT || 3000;
app.listen(port);
//console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
