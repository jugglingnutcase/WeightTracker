/*
 * GET weights
 *
 * Gets all weights
 */

exports.getWeights = function(req, res) {
  db.get('users', function(err, users) {
    if (err) {
      res.json({error: 'No users available.'});
    } else {
      res.json(users);
    }
  });
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
    }

    res.redirect('/');
  });
};
