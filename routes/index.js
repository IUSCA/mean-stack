var express = require('express');
var router = express.Router();

// Load the models.js file (one directory up!)
var db = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// Create a new route to query DB
// Second parameter is a function that takes in:
//   req:  All details of the client request
//   res:  A response handler, used to return data/status/error to client
//   next:  Call the next chained function if needed
router.get('/stars', function(req, res, next) {
    // Set the limit for number of results based on the url parameter
    // Set a default if limit is undefined
    var limit = req.query.limit !== undefined ? parseInt(req.query.limit) : 10;

    // Use the Star model to query the mongo stars collection
    db.Star
        .find()
        .limit(limit)
        .exec(function(err, _stars) {
            // if we encounter an error, call next() to let express error handling take care of it
            if(err) return next(err);
            // if no error then send the results back as JSON
            res.json(_stars);
        });
});

module.exports = router;
