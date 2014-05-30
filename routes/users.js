/*
 * GET new user
 */

exports.new = function(req, res) {
  res.render('newuser', { title: 'Add yourself to the fun!' });
};

/*
 * POST add user to db
 */

exports.add = function(req, res) {
  // Print up the request
  var config = req.body;
  var userName = req.body.userName;

  db.get('users', function (err, users) {
    if (err) {
      console.log('Users isn\'t in the db yet... initializing', err) // likely the key was not found
      users = {};
    }

    // Add the user into the database if they aren't already in there
    var userNames = Object.keys(users);
    if( userNames.indexOf(userName) === -1 ) {
      users[userName] = {
        name: userName,
        weights: []
      };
      db.put('users', users);
    } else {
      console.log("We've already got one " + userName + " in the db!");
    }

    res.redirect('/');
  });
};
