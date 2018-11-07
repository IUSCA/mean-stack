
// Load the mongoose package
var mongoose = require('mongoose');

////////////////////////
// CONNECT TO MONGODB //
////////////////////////

// Create the init function, which takes a callback (cb)
var init = function(cb) {
    // Call mongoose.connect, passing the url string and an empty options object {}
    mongoose.connect('mongodb://localhost:27017/ADASS', {})
        .then(function() {
            // if successful then call the callback with no parameters
            cb();
        }).catch(function(err){
            // if unsuccessful, call the callback with the err reported by mongoose.connect
            cb(err);
        })
};


// Export the init function to make it available to other parts of the code
exports.init = init;

/////////////////////////////
// DESCRIBE THE COLLECTION //
/////////////////////////////

var starSchema = mongoose.Schema({
    name: String,
    ra: Number,
    dec: Number,

    //GeoJSON
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

// Create index on location for geoJSON to function
starSchema.index({location: '2dsphere'});

// Export the schema
// First argument is the *singular* name of the collection your model is for.
// Mongoose automatically looks for the plural version of your model name.

exports.Star = mongoose.model('Star', starSchema);