let express = require('express');   // We are using the express library for the web server
let app = express();            // We need to instantiate an express object to interact with the server in our code
PORT = 9124;                 // Set a port number at the top so it's easy to change in the future

// Database
const db = require('./database/db-connector')

/*
    ROUTES
*/
// create new Router instance for api routes

// mount the router on the app
app.use('/', require('./routes'));
module.exports = app;

let router = require('express').Router();

//all /beverage/ routes are contained in routes/beverage/index.js
router.use('/beverage', require('./routes/beverage'));




/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
