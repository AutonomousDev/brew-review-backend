let router = require('express').Router();
const db = require('../../database/db-connector')

router.get('/', (req, res) => {
    /** Select breweries for the homepage */
    // Define our queries
    let query1 = "SELECT Brewery.name AS 'Brewery', Brewery.streetNumber AS 'Street_Number', " 
    query1 += "Brewery.streetName AS 'Street_Name', Brewery.city AS 'City', "
    query1 += "Brewery.zipCode AS 'Zip_Code', Brewery.state AS 'State', "
    query1 += "Brewery.website AS 'Website', Brewery.breweryID AS 'breweryID' "
    query1 += "FROM Brewery;";


    // Execute every query in an asynchronous manner, we want each query to finish before the next one starts
    db.pool.query(query1, (err, rows, fields) => {
        // Send the results to the browser
        res.setHeader('Content-Type', 'application/json');
        res.json(rows);
    });
});

router.get('/:id', (req, res) => {
    /** Select brewery by id */

    //Stores the input id from the request to a variable
    const breweryIDNumber = req.params.id  

    // Define our queries
    let query1 = "SELECT Brewery.name AS 'Brewery', Brewery.streetNumber AS 'Street_Number', " 
    query1 += "Brewery.streetName AS 'Street_Name', Brewery.city AS 'City', "
    query1 += "Brewery.zipCode AS 'Zip_Code', Brewery.state AS 'State', "
    query1 += "Brewery.website AS 'Website', Brewery.breweryID AS 'breweryID' "
    query1 += "FROM Brewery "
    query1 += "WHERE Brewery.breweryID = ?;";


    
    // Execute every query in an asynchronous manner, we want each query to finish before the next one starts
    db.pool.query(query1, [breweryIDNumber], (err, rows, fields) => {
        // Send the results to the browser
        res.setHeader('Content-Type', 'application/json');
        res.json(rows);
    });
});

router.post('/', (req, res) => {

    console.log("Inserting information into the brewery table: ");
    let data = req.body;

    // Defining our queries
    let query1 = `INSERT INTO Brewery (name, streetNumber, streetName, city,
        zipCode, state, website) `
    query1 += `VALUES ('${data.nameInput}', ${data.streetNumberInput}, '${data.streetNameInput}', '${data.cityInput}',
        ${data.zipCodeInput}, '${data.stateInput}', '${data.websiteInput}');`
    console.log(query1);

    db.pool.query(query1, (err, rows, fields) => {
        res.redirect('/');
    });


});

module.exports = router;