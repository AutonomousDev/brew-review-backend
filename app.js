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


// To add new routes, create a new folder in routes using beverages as an example
// go to ./routes/index.js and add a new line for each group of api requests
app.get('/', function(req, res)
    {
        // Define our queries
        query1 = 'DROP TABLE IF EXISTS diagnostic;';
        query2 = 'CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);';
        query3 = 'INSERT INTO diagnostic (text) VALUES ("MySQL is working!")';
        query4 = 'SELECT * FROM diagnostic;';

        // Execute every query in an asynchronous manner, we want each query to finish before the next one starts

        // DROP TABLE...
        db.pool.query(query1, function (err, results, fields){

            // CREATE TABLE...
            db.pool.query(query2, function(err, results, fields){

                // INSERT INTO...
                db.pool.query(query3, function(err, results, fields){

                    // SELECT *...
                    db.pool.query(query4, function(err, results, fields){

                        // Send the results to the browser
                        res.send(JSON.stringify(results));
                    });
                });
            });
        });
    });

/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});