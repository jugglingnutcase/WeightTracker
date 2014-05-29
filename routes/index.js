/*
 * GET home page.
 */

exports.index = function(req, res){
  db.get('users', function(err, users) {
    if (err) {
      console.log('No users in the system... using an empty collection')
      users = {}
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
 * POST addWeight
 */

exports.addWeight = function(req, res) {
  console.log("Trying to post a weight here!")

  db.get('users', function(err, users) {
    if (err) console.log("there's a problem here!");

    var userNames = Object.keys(users);
    if (userNames.indexOf(req.body.user) !== -1) {
        var weight = {
          date: Date.parse(req.body.date) / 1000,
          weight: parseFloat(req.body.weight)
        };

        // Update the value and put things back in the db
        users[req.body.user].weights.push(weight);
        db.put('users', users);
        console.log("User: %s added weight %s at %s", req.body.user, req.body.weight, req.body.date);

        // Render the normal page for now
        res.render('index', {
          title: 'Home',
          users: users
        });
    } else {
      // Render the normal page for now with an error
      res.render('index', {
        title: 'Home',
        users: users,
        error: 'Inputting weight failed! There\'s no user by that name!'
      });
    }
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
      users = {};
    }

    var userNames = Object.keys(users);

    // Add the user into the database if they aren't already in there
    if( userNames.indexOf(userName) === -1 ) {
      users[userName] = {
        name: userName,
        weights: []
      };

      db.put('users', users);
    } else {
      console.log("We've already got one " + userName + " in the db!");
    }

    res.render('index', {
      title: 'Home',
      users: users
    });
  });

};
