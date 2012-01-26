var util = require('util');

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

/*
 * POST user
 */

exports.addUser = function(req, res, db){
  // Print up the request
  console.log("Request here: " + req);
  console.log(util.inspect(req));

  res.render('index', { title: 'Added User!' });
};
