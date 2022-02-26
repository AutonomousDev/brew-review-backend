// .env contains project secretes so passwords aren't commited to a public repository
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

var express = require('express');   // We are using the express library for the web server
var app = express();            // We need to instantiate an express object to interact with the server in our code
PORT = 9124;                 // Set a port number at the top so it's easy to change in the future

// Database
const db = require('./database/db-connector')

/*
    ROUTES
*/
app.get('/', function (req, res) {
    // Define our queries
    query1 = 'DROP TABLE IF EXISTS diagnostic;';
    query2 = 'CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);';
    query3 = 'INSERT INTO diagnostic (text) VALUES ("MySQL is working!")';
    query4 = 'SELECT * FROM diagnostic;';

    // Execute every query in an asynchronous manner, we want each query to finish before the next one starts

    // DROP TABLE...
    db.pool.query(query1, function (err, results, fields) {

        // CREATE TABLE...
        db.pool.query(query2, function (err, results, fields) {

            // INSERT INTO...
            db.pool.query(query3, function (err, results, fields) {

                // SELECT *...
                db.pool.query(query4, function (err, results, fields) {

                    // Send the results to the browser
                    res.send(JSON.stringify(results));
                });
            });
        });
    });
});



app.get('/beverage', (req, res) => {
    /** Select beverages for the homepage */
    // Define our queries
    let query1 = "SELECT Beverage.name AS 'Beverage Name', Beverage.abv AS 'ABV', Brewery.name AS 'Brewery', Category.name AS 'Category' " 
    query1 += "FROM Beverage "
    query1 += "INNER JOIN Brewery ON Beverage.breweryID = Brewery.breweryID "
    query1 += "INNER JOIN Category ON Beverage.categoryID = Category.categoryID "
    query1 += "LIMIT 6;";

    // Execute every query in an asynchronous manner, we want each query to finish before the next one starts
    db.pool.query(query1, (err, rows, fields) => {
        // Send the results to the browser
        res.setHeader('Content-Type', 'application/json');
        res.json({rows});
    });
});

app.get('/beverage/category/:id', (req, res) => {
    console.log("Fetching beverages with category: " + req.params.id)
    /** Select beverages by category name */

    //Stores the input id from the request to a variable
    const category_id = req.params.id   

    // Define our queries
    // ? towards the end is replaced with category_id
    let query1 = "SELECT Beverage.name AS 'Beverage Name', Beverage.abv AS 'ABV', Brewery.name AS 'Brewery', Category.name AS 'Category' "
    query1 += "FROM Beverage "
    query1 += "INNER JOIN Brewery ON Beverage.breweryID = Brewery.breweryID "
    query1 += "INNER JOIN Category ON Beverage.categoryID = Category.categoryID "
    query1 += "WHERE Category.categoryID = ? "
    query1 += "LIMIT 6;";
    
    // Execute every query in an asynchronous manner, we want each query to finish before the next one starts
    // This is where category_id is inserted into the query at ?
    db.pool.query(query1, [category_id], (err, rows, fields) => {
        // Send the results to the browser
        res.json({rows});
    });
});

app.get('/beverage/brewery/:id', (req, res) => {
    console.log("Fetching beverages with brewery: " + req.params.id)
    /** Select beverages by brewery name */

    //Stores the input id from the request to a variable
    const brewery_id = req.params.id   

    // Define our queries
    // ? towards the end is replaced with brewery_id
    let query1 = "SELECT Beverage.name AS 'Beverage Name', Beverage.abv AS 'ABV', Category.name AS 'Category' "
    query1 += "FROM Beverage "
    query1 += "INNER JOIN Brewery ON Beverage.breweryID = Brewery.breweryID "
    query1 += "INNER JOIN Category ON Beverage.categoryID = Category.categoryID "
    query1 += "WHERE Brewery.breweryID = ? "
    query1 += "LIMIT 6;";

    // Execute every query in an asynchronous manner, we want each query to finish before the next one starts
    // This is where brewery_id is inserted into the query at ?
    db.pool.query(query1, [brewery_id], (err, rows, fields) => {
        // Send the results to the browser
        res.json({rows});
    });
});




/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});