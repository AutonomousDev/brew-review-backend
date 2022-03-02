let router = require('express').Router();
const db = require('../../database/db-connector')

router.get('/', (req, res) => {
    /** Select breweries for the homepage */
    // Define our queries
    let query1 = "SELECT Brewery.name AS 'Brewery', Brewery.streetNumber AS 'Street Number', " 
    query1 += "Brewery.streetName AS 'Street Name', Brewery.city AS 'City', "
    query1 += "Brewery.zipCode AS 'Zip Code', Brewery.state AS 'State', "
    query1 += "Brewery.website AS 'Website' "
    query1 += "FROM Brewery "
    query1 += "LIMIT 6;"

    // Execute every query in an asynchronous manner, we want each query to finish before the next one starts
    db.pool.query(query1, (err, rows, fields) => {
        // Send the results to the browser
        res.setHeader('Content-Type', 'application/json');
        res.json({rows});
    });
});

module.exports = router;