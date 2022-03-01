let router = require('express').Router();
const db = require('../../database/db-connector')

router.get('/parent-category', (req, res) => {
    /** Select parent_categories for the homepage */
    // Define our queries
    let query1 = "SELECT Parent_Category.name AS 'Type' " 
    query1 += "FROM Parent_Category;"

    // Execute every query in an asynchronous manner, we want each query to finish before the next one starts
    db.pool.query(query1, (err, rows, fields) => {
        // Send the results to the browser
        res.setHeader('Content-Type', 'application/json');
        res.json({rows});
    });
});

module.exports = router;  