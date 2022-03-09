let router = require('express').Router();
const db = require('../../database/db-connector')

router.get('/', (req, res) => {
    /** Select categories for the homepage */
    // Define our queries
    let query1 = "SELECT Parent_Category.name AS 'Type', Category.name AS 'Name', Category.categoryID AS 'categoryID', Category.parentCategoryID AS parentCategoryID " 
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

router.get('/:id', (req, res) => {
    /** Select category by id */

    //Stores the input id from the request to a variable
    const categoryID = req.params.id  

    // Define our queries
    let query1 = "SELECT Parent_Category.name AS 'Type', Category.name AS 'Name' " 
    query1 += "FROM Category "
    query1 += "INNER JOIN Parent_Category "
    query1 += "ON Category.parentCategoryID = Parent_Category.parentCategoryID "
    query1 += "WHERE Category.categoryID = ? ;"

    // Execute every query in an asynchronous manner, we want each query to finish before the next one starts
    db.pool.query(query1, [categoryID], (err, rows, fields) => {
        // Send the results to the browser
        res.setHeader('Content-Type', 'application/json');
        res.json(rows);
    });
});

router.post('/', (req, res) => {

    console.log("Inserting information into the category table: ");
    let data = req.body;

    // Defining our queries
    let query1 = `INSERT INTO Category (name, parentCategoryID) `
    query1 += `VALUES ('${data.nameInput}', ${data.parentCategoryID_FK});`
    console.log(query1);

    db.pool.query(query1, (err, rows, fields) => {
        res.redirect('/');
    });


});

router.put('/edit-category/:id', (req, res) => {

    console.log(`Updating category at id: ${req.params.id}`);
    let data = req.body;

    let query1 = `UPDATE Category `
    query1 += `SET name = '${data.nameInput}', parentCategoryID = ${data.parentCategoryID_FK} `
    query1 += `WHERE categoryID = ${req.params.id};`

    db.pool.query(query1, (err, rows, fields) => {
        res.redirect('/');
    });
    
});

router.delete('/delete-category/:id', (req, res) => {

    console.log(`Deleting category at id: ${req.params.id}`);

    let query1 = `DELETE FROM Category `
    query1 += `WHERE categoryID = ${req.params.id};`

    db.pool.query(query1, (err, rows, fields) => {
        res.redirect('/');
    });
});

module.exports = router;  