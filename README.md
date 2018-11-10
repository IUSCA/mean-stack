# MEAN Stack Tutorial

This repository represents the end state of the tutorial.  The different branches of this repository correspond to checkpoints during the tutorial.   

## Installation
- Clone this repository
- `cd mean-stack`
- `npm install`
- Complete database setup (see below)
- `npm start`
- Visit http://localhost:3000

## Database Setup
`mongoimport --db ADASS --collection stars --file 100k_stars.csv --type csv --headerline`

## Cheatsheet
*  [MEAN Stack Cheatsheet](https://docs.google.com/document/d/1mv8JhqXlggjaWaHEIa6vSQStE2_4Nn5Cxk_ksHihaQ0/edit?usp=sharing) - Useful list of commands, file descriptions, and code snippets.  A printed copy of the cheatsheet will be handed out at the start of the tutorial

# Tutorial Checkpoints

At various points in the tutorial, attendees will be asked to switch to a particular checkpoint within this repository.  This ensures that all attendees are on the same page and have a working version of the code to proceed to the next section.

## To Use Checkpoints

Take the following steps to preserve any changes you have made on a new branch before switching to the specified checkpoint branch

- `git checkout -b ${new branch name}` 
- `git commit -am 'saving my changes'`
- `git checkout -t origin/checkpoint_${n}`
- `npm install`
- `npm start`

## Checkpoint Descriptions

### checkpoint_1

- Used Express Generator to create project
- Installed nodemon
- Modified package.json to use nodemon

##### Verify checkpoint:

- Visit http://localhost:3000 - you should see Express default view in browser window

- In node console should see:  
  - ``[nodemon] starting `node ./bin/www` ``
  
### checkpoint_2

- Mongoose node package installed
- models.js created to connect to mongo using mongoose
- app.js modified to require model.js and call db.init()

##### Verify checkpoint:

- In node console you should see:  
  - `Successfully connected to database`

### checkpoint_3

- Added Star schema to models.js
- Required models.js in routes/index.js
- Added /stars route to query stars collection in mongo
- Checked for limit url parameter and set default otherwise

##### Verify checkpoint:

- Visit http://localhost:3000/stars - you should see 10 database records

- Visit http://localhost:3000/stars?limit=5 - you should see 5 database records
  
### checkpoint_4

- Made the node_modules directory available as a public route
- Installed bootstrap/bootswatch to make our UI nicer
- Installed Angularjs
- Added angular and bootstrap as source files to  public/index.html
- Created simple Hello World!  AngularJS application

##### Verify checkpoint:

- Visit http://localhost:3000 - "Hello !" text is modified as text is entered in input box
  
### checkpoint_5

- Created angular module 'myApp'
- Created SearchController for myApp
- Defined columns to display
- Created doSearch function to get data from /stars 
- Added button to execute doSearch()
- Added table with ng-repeats to display column headers and returned data	
- Used ng-if to show magnitude errors if they exist

##### Verify checkpoint:

- Visit http://localhost:3000 - Clicking "Fetch Data" button shows results in table
  
### checkpoint_6

- Added form elements
- Created search object with regex and lt/gt logic in angular function
- Switched API from GET to POST
- Pass POST data to mongo find(), then return and render matching results

##### Verify checkpoint:

- Visit http://localhost:3000 
  - Enter form data and check to see results match
  
### checkpoint_7

- Used angular forEach and ng-repeat to expand form to query all magnitudes

##### Verify checkpoint:

- Visit http://localhost:3000 
  - Enter form data and check to see results match
  

### checkpoint_8

- Added form elements for positional search
- Updated schema in models.js to add location field
- Created conditional positional search query in routes/index.js
- Ran Mongo commands to create GeoJSON points

##### Verify checkpoint:

- Run the following commands in the mongo shell: 
    ```
    use ADASS; 
    db.stars.find().forEach(
        function (elem) {
            db.stars.update(
                {
                    _id: elem._id
                },
                {
                    $set: {
                        location: { type: "Point", coordinates: [elem.ra - 180.0, elem.dec]}
                    }
                }
            );
        }
    );
    ```

- Visit http://localhost:3000 
  - Run positional search queries through UI to see if results match.
  - Try RA=302.495 DEC=-45.502 and radius=300

