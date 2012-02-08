
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , Database = require('./lib/db')
  , less = require('less')
  , util = require('util')
  , fs = require('fs');

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
  db = new Database('./roommates.db');
  db.load(function() {
    console.log(' database internal: %s', util.inspect(db));
  });
  
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 

  // db backup every hour i'm hoping
  setInterval( function () {
    var fileLocation = "./backups/weights-" + new Date().toString() + ".db.backup"
    console.log("Backing up to: %s", fileLocation);
    db.backup(fileLocation);
  }, 60 * 1000);
});

app.configure('production', function(){
  db = new Database('./roommies.db');
  db.load(function() {
    console.log(' database internal: %s', util.inspect(db));
  });
  app.use(express.errorHandler()); 

  // db backup every hour i'm hoping
  setInterval( function () {
    var fileLocation = "./backups/weights-" + new Date().toString() + ".db.backup"
    db.backup(fileLocation);
  }, 60 * 60 * 1000);
});

// Routes

app.get('/', routes.index);
app.get('/newUser', routes.newUser);
app.post('/addUser', routes.addUser);
app.post('/addWeight', routes.addWeight);

// listening
app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
console.log(' database: %s', db.path);

