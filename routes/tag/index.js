let router = require('express').Router();
const db = require('../../database/db-connector')

router.get('/', (req, res) => {
    /** Select tags for the tag page */
    // Define our queries
    let query1 = "SELECT Tag.name AS 'Name', Tag.tagID AS 'tagID' " 
    query1 += "FROM Tag;"

    // Execute every query in an asynchronous manner, we want each query to finish before the next one starts
    db.pool.query(query1, (err, rows, fields) => {
        // Send the results to the browser
        res.setHeader('Content-Type', 'application/json');
        res.json(rows);
    });
});

router.post('/', (req, res) => {

    console.log("Inserting information into the tag table: ");
    let data = req.body;

    // Defining our queries
    let query1 = `INSERT INTO Tag (name) `
    query1 += `VALUES ('${data.nameInput}');`
    console.log(query1);

    db.pool.query(query1, (err, rows, fields) => {
        res.redirect('/');
    });


});


router.put('/update-tag/:id', (req, res) => {

    let data = req.body;
    console.log(`Updating tag with tag id: ${req.params.id}`)
    // Defining our queries
    let query1 = `UPDATE Tag SET name = '${data.nameInput}' WHERE tagID = ${req.params.id};`;    
    console.log(query1);
    db.pool.query(query1, (err, rows, fields) => {
        if (err){
            throw err;
        } else {
            res.end(JSON.stringify(rows));
        }
    });
});

router.delete('/delete-tag/:id', (req, res) => {

    console.log(`Deleting tag with tag id: ${req.params.id}`);
    let query1 = `DELETE FROM Tag `
    query1 += `WHERE tagID = ${req.params.id};`;

    db.pool.query(query1, (err, rows, fields) => {
        res.redirect('/');
    });
});

module.exports = router;  