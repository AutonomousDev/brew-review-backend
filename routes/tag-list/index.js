let router = require('express').Router();
const db = require('../../database/db-connector')

router.get('/', (req, res) => {
    /** Select tags for the tag page */
    // Define our queries
    let query1 = "SELECT Tag.name AS 'Name' " 
    query1 += "FROM Tag;"

    // Execute every query in an asynchronous manner, we want each query to finish before the next one starts
    db.pool.query(query1, (err, rows, fields) => {
        // Send the results to the browser
        res.setHeader('Content-Type', 'application/json');
        res.json({rows});
    });
});

module.exports = router;  