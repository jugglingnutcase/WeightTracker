
/**
 * Module dependencies.
 */

var express = require('express')
  , bodyParser = require('body-parser')
  , routes = require('./routes')
  , users = require('./routes/users')
  , weights = require('./routes/weights')
  , level = require('level')
  , less = require('less')
  , util = require('util')
  , fs = require('fs');

var app = express();

// Configuration
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

// setup us the db
db = level('./db/roommates.db', {
  'valueEncoding': 'json'
});

// Routes
app.get('/', routes.index);
app.get('/users/new', users.new);
app.post('/users/add', users.add);
app.get('/weights', weights.getWeights);
app.post('/weights/add', weights.addWeight);

// Listen
var port = process.env.PORT || 3000;
app.listen(port);
