let router = require('express').Router();
const db = require('../../database/db-connector')

router.get('/', (req, res) => {
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

router.get('/category/:id', (req, res) => {
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
        res.setHeader('Content-Type', 'application/json');
        res.json({rows});
    });
});

router.get('/brewery/:id', (req, res) => {
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


module.exports = router;  