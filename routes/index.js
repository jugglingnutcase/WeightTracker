var util = require('util');

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Home' })
};

exports.newuser = function(req, res){
  res.render('index', { title: 'Home' })
};

/*
 * POST user
 */

exports.addWeight = function(req, res){
  db.users.forEach(function(user) {
    if ( user.name === req.body.user ) {
      var dataPoint = {};

      dataPoint.x = Date.parse(req.body.date) / 1000;
      dataPoint.y = req.body.weight;

      user.data.push(dataPoint);
      db.save();

      console.log("Data point added: %s", util.inspect(dataPoint));
      // Render the normal page for now
      res.render('index', { title: 'Home' });
    }
  });
};

/*
 * POST user
 */

exports.addUser = function(req, res){
  // Print up the request
  var config = req.body;
  var userName = req.body.userName;

  // Add the user into the database if they arent already in there
  if( !(userName in db.users) ) {
    db.users = { "name": userName, "data":{} };

    // Save any database changes
    db.save();
  }
  else {
    console.log("We've already got one (" + userName + ") !");
  }

  res.render('index', { title: 'Home' });
};
