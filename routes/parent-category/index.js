let router = require('express').Router();
const db = require('../../database/db-connector')

router.get('/', (req, res) => {
    /** Select parent_categories for the homepage */
    // Define our queries
    let query1 = "SELECT Parent_Category.name AS 'Type', Parent_Category.parentCategoryID as 'parentCategoryID' " 
    query1 += "FROM Parent_Category;"

    // Execute every query in an asynchronous manner, we want each query to finish before the next one starts
    db.pool.query(query1, (err, rows, fields) => {
        // Send the results to the browser
        res.setHeader('Content-Type', 'application/json');
        res.json(rows);
    });
});

router.post('/', (req, res) => {

    console.log("Inserting information into the parent category table: ");
    let data = req.body;

    // Defining our queries
    let query1 = `INSERT INTO Parent_Category (name) `
    query1 += `VALUES ('${data.nameInput}');`
    console.log(query1);

    db.pool.query(query1, (err, rows, fields) => {
        res.redirect('/');
    });


});

router.put('/edit-parent-category/:id', (req, res) => {

    console.log(`Updating parent category id: ${req.params.id}`);
    let data = req.body;

    let query1 = `UPDATE Parent_Category `
    query1 += `SET name = '${data.nameInput}' `
    query1 += `WHERE parentCategoryID = ${req.params.id};`;

    db.pool.query(query1, (err, rows, fields) => {
        res.redirect('/');
    });
});

router.delete('/delete-parent-category/:id', (req, res) => {

    console.log(`Deleting parent category id: ${req.params.id}`);

    let query1 = `DELETE FROM Parent_Category `
    query1 += `WHERE parentCategoryID = ${req.params.id};`;

    db.pool.query(query1, (err, rows, fields) => {
        res.redirect('/');
    });
});

module.exports = router;  