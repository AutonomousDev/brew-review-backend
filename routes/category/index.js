let router = require('express').Router();
const db = require('../../database/db-connector')

router.get('/category', (req, res) => {
    /** Select categories for the homepage */
    // Define our queries
    let query1 = "SELECT Parent_Category.name AS 'Type', Category.name AS 'Name' " 
    query1 += "FROM Category "
    query1 += "INNER JOIN Parent_Category "
    query1 += "ON Category.parentCategoryID = Parent_Category.parentCategoryID;"

    // Execute every query in an asynchronous manner, we want each query to finish before the next one starts
    db.pool.query(query1, (err, rows, fields) => {
        // Send the results to the browser
        res.setHeader('Content-Type', 'application/json');
        res.json(rows);
    });
});

module.exports = router;  