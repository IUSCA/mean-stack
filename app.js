var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Load the models.js file
var db = require('./models');

// Initialize the database connection
// Call db.init and pass it the callback function to be used (cb)
db.init(function(err) {
    if(err == undefined) {
        // if cb() called by init, we know everything worked
        console.log('Successfully connected to database');
    } else {
        // if cb(err) called by init, print the error to the console log
        console.log("Error connecting!");
        console.log(err);
    }
});


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
