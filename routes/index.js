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

// use router.post when you need your route to accept data
router.post('/stars', function(req, res, next) {
    // Set the limit for number of results based on the url parameter
    // Set a default if limit is undefined
    var limit = req.query.limit !== undefined ? parseInt(req.query.limit) : 10;

    // call geo_search to construct the geospatial query if needed
    geo_search(req.body.pos, req.body.query, function(_q){
        // Use the Star model to query the mongo stars collection
        db.Star
            .find(_q) //pass the updated search query as the find parameters
            .limit(limit)
            .exec(function(err, _stars) {
                // if we encounter an error, call next() to let express error handling take care of it
                if(err) return next(err);
                // if no error then send the results back as JSON
                res.json(_stars);
            });
    })
});

// define the needed keys for geospatial searches
const geo_keys = ['ra','dec','radius','radius_unit'];

// conversion factors
// mongo geospatial uses distance based on meters on surface of the earth
// mongo assumes an earth radius of 6378.1 km
const rad_conv = {
    'arcsec' : 30.88749994,
    'arcmin' : 1853.2499964,
    'degree' : 111194.999784
};

function geo_search(pos_fields, q, cb){
    console.log(pos_fields);
    var valid = true;

    //check to make sure all needed keys are set
    geo_keys.forEach(function(gk){
        if(!(gk in pos_fields)) valid = false;
        if(pos_fields[gk] == '') valid = false;
        console.log(gk, pos_fields[gk]);
    });

    //if any position fields are missing, return the unmodified query
    if(!valid) return cb(q);

    // convert the distance
    var m_dist = rad_conv[pos_fields.radius_unit] * pos_fields.radius;

    // shift the query ra to work with geoJSON (lon -180:180)
    var lon = pos_fields.ra - 180.0;
    var lat = pos_fields.dec;

    console.log(m_dist, lon, lat);

    //define the location query
    q.location = {
                $nearSphere: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lon, lat] //center point
                    },
                    $maxDistance: m_dist //search radius (in meters)
                }
            };
    // pass modified query to callback function
    cb(q);
};


module.exports = router;
