let router = require('express').Router();
const db = require('../../database/db-connector')

router.get('/', (req, res) => {
    /** Select beverages for the homepage */
    // Define our queries
    let query1 = "SELECT Beverage.name AS 'Beverage_Name', Beverage.abv AS 'ABV', "
    query1 += "Brewery.name AS 'Brewery', Category.name AS 'Category', Category.categoryID AS 'categoryID', "
    query1 += "Brewery.breweryID AS 'breweryID', Beverage.beverageID AS 'beverageID' " 
    query1 += "FROM Beverage "
    query1 += "INNER JOIN Brewery ON Beverage.breweryID = Brewery.breweryID "
    query1 += "INNER JOIN Category ON Beverage.categoryID = Category.categoryID "
    //query1 += "LIMIT 6;";

    // Execute every query in an asynchronous manner, we want each query to finish before the next one starts
    db.pool.query(query1, (err, rows, fields) => {
        // Send the results to the browser
        res.setHeader('Content-Type', 'application/json');
        res.json(rows);
    });
});

router.get('/:id', (req, res) => {
    /** Select beverages for the homepage */

    //Stores the input id from the request to a variable
    const beverage_ID = req.params.id   

    // Define our queries
    let query1 = "SELECT Beverage.name AS 'Beverage_Name', Beverage.abv AS 'ABV', "
    query1 += "Brewery.name AS 'Brewery', Category.name AS 'Category', Category.categoryID AS 'categoryID', "
    query1 += "Brewery.breweryID AS 'breweryID', Beverage.beverageID AS 'beverageID' " 
    query1 += "FROM Beverage "
    query1 += "INNER JOIN Brewery ON Beverage.breweryID = Brewery.breweryID "
    query1 += "INNER JOIN Category ON Beverage.categoryID = Category.categoryID "
    query1 += "WHERE Beverage.beverageID = ? "
    //query1 += "LIMIT 6;";

    // Execute every query in an asynchronous manner, we want each query to finish before the next one starts
    db.pool.query(query1, [beverage_ID], (err, rows, fields) => {
        // Send the results to the browser
        res.setHeader('Content-Type', 'application/json');
        res.json(rows);
    });
});

router.get('/category/:id', (req, res) => {
    console.log("Fetching beverages with category: " + req.params.id)
    /** Select beverages by category name */

    //Stores the input id from the request to a variable
    const category_id = req.params.id   

    // Define our queries
    // ? towards the end is replaced with category_id
    let query1 = "SELECT Beverage.name AS 'Beverage_Name', Beverage.abv AS 'ABV', Brewery.name AS 'Brewery', Category.name AS 'Category', Category.categoryID AS 'categoryID', Brewery.breweryID AS 'breweryID' "
    query1 += "FROM Beverage "
    query1 += "INNER JOIN Brewery ON Beverage.breweryID = Brewery.breweryID "
    query1 += "INNER JOIN Category ON Beverage.categoryID = Category.categoryID "
    query1 += "WHERE Category.categoryID = ? "
    //query1 += "LIMIT 6;";
    
    // Execute every query in an asynchronous manner, we want each query to finish before the next one starts
    // This is where category_id is inserted into the query at ?
    db.pool.query(query1, [category_id], (err, rows, fields) => {
        // Send the results to the browser
        res.setHeader('Content-Type', 'application/json');
        res.json(rows);
    });
});

router.get('/brewery/:id', (req, res) => {
    console.log("Fetching beverages with brewery: " + req.params.id)
    /** Select beverages by brewery name */

    //Stores the input id from the request to a variable
    const brewery_id = req.params.id   

    // Define our queries
    // ? towards the end is replaced with brewery_id
    let query1 = "SELECT Beverage.name AS 'Beverage_Name', Beverage.abv AS 'ABV', Category.name AS 'Category', Brewery.name AS 'Brewery', Category.categoryID AS 'categoryID', Brewery.breweryID AS 'breweryID' "
    query1 += "FROM Beverage "
    query1 += "INNER JOIN Brewery ON Beverage.breweryID = Brewery.breweryID "
    query1 += "INNER JOIN Category ON Beverage.categoryID = Category.categoryID "
    query1 += "WHERE Brewery.breweryID = ? "
    //query1 += "LIMIT 6;";

    // Execute every query in an asynchronous manner, we want each query to finish before the next one starts
    // This is where brewery_id is inserted into the query at ?
    db.pool.query(query1, [brewery_id], (err, rows, fields) => {
        // Send the results to the browser
        res.json(rows);
    });
});

router.post('/', (req, res) => {

    console.log("Inserting information into the beverage table: ");
    let data = req.body;
    console.log(data);

    // Defining our queries
    let query1 = `INSERT INTO Beverage (name, abv, breweryID, categoryID) `
    query1 += `VALUES ('${data.nameInput}', ${data.abvInput}, ${data.breweryID_FK}, ${data.categoryID_FK});`
    console.log(query1);

    db.pool.query(query1, (err, rows, fields) => {
        res.redirect('/');
    });


});

router.put('/edit-beverage/:id', (req, res) => {

    let data = req.body;
    console.log(req.params);
    console.log(`Updating beverage on id ${req.params.id}:`);
    let query1 = `UPDATE Beverage `
    query1 += `SET name = '${data.nameInput}', abv = ${data.abvInput}, breweryID = ${data.breweryID_FK}, categoryID = ${data.categoryID_FK} `
    query1 += `WHERE beverageID = ${req.params.id};`;

    db.pool.query(query1, (err, rows, fields) => {
        res.redirect('/');
    });
});

router.delete('/delete-beverage/:id', (req, res) => {

    console.log(`Deleting beverage at ${req.params.id}`);
    let query1 = `DELETE FROM Beverage `
    query1 += `WHERE beverageID = ${req.params.id};`;

    db.pool.query(query1, (err, rows, fields) => {
        res.redirect('/');
    });
});


module.exports = router;  