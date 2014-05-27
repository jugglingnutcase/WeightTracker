/*
 * GET home page.
 */

exports.index = function(req, res){
  db.get('users', function(err, users) {
    if (err) {
      console.log('No users in the system... using an empty collection')
      users = []
    } else {
      console.log('Found ' + users.length + ' users in the db', users);
    }

    res.render('index', {
      title: 'Home',
      users: users
    })
  });
};

exports.newuser = function(req, res){
  res.render('index', { title: 'Home' })
};

/*
 * POST user
 */

exports.addWeight = function(req, res) {
  db.get('users', function(err, users) {
    if (err) return console.log('There are no users in the db');

    users.forEach(function(user) {
      if ( user.name === req.body.user ) {
        var dataPoint = {};

        dataPoint.x = Date.parse(req.body.date) / 1000;
        dataPoint.y = parseFloat(req.body.weight);

        user.data.push(dataPoint);

        console.log("User: %s added weight %s at %s", user.name, req.body.weight, req.body.date);

        // Render the normal page for now
        res.render('index', { title: 'Home' });
      }
    });
  });
};

/*
 * GET add user
 */

exports.newUser = function(req, res){
  res.render('newuser', { title: 'Add yourself to the fun!' });
};

/*
 * POST user
 */

exports.addUser = function(req, res){
  // Print up the request
  var config = req.body;
  var userName = req.body.userName;

  db.get('users', function (err, users) {
    if (err) {
      console.log('Users isn\'t in the db yet... initializing', err) // likely the key was not found
      users = [];
    }

    // Add the user into the database if they aren't already in there
    if( !(userName in users) ) {
      users.push(userName)
      db.put('users', users);
    } else {
      console.log("We've already got one (" + userName + ") !");
    }

    res.render('index', {
      title: 'Home',
      users: users
    });
  });

};
