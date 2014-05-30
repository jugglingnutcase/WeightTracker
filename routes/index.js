/*
 * GET home page.
 */

exports.index = function(req, res){
  db.get('users', function(err, users) {
    if (err) {
      console.log('No users in the system... using an empty collection')
      users = {}
    } else {
      console.log('Found ' + Object.keys(users).length + ' users in the db', users);
    }

    res.render('index', {
      title: 'Home',
      users: users
    })
  });
};
