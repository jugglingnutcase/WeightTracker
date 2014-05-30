
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , users = require('./routes/users')
  , weights = require('./routes/weights')
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
app.get('/users/new', users.new);
app.post('/users/add', users.add);
app.get('/weights', weights.getWeights);
app.post('/weights/add', weights.addWeight);

var port = process.env.PORT || 3000;
app.listen(port);
