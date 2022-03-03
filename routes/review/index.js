let router = require('express').Router();
const db = require('../../database/db-connector')

router.get('/:id', (req, res) => {
    /** Select reviews for a certain beverage */
    console.log("Fetching reviews: " + req.params.id)
    //Stores the input id from the request to a variable
    const review_id = req.params.id   

    // Define our queries
    let query1 = "SELECT Review.rating AS 'Rating', Review.textReview AS 'Review_Text' " 
    query1 += "FROM Review "
    query1 += "WHERE Review.reviewID = ?;"

    let query2 = "SELECT Tag.name AS 'Tags' "
    query2 += "FROM Tag "
    query2 += "INNER JOIN Review_Tag ON Tag.tagID = Review_Tag.tagID "
    query2 += "INNER JOIN Review ON Review_Tag.reviewID = Review.reviewID "
    query2 += "WHERE Review.reviewID = ?;"

    // Execute every query in an asynchronous manner, we want each query to finish before the next one starts
    // This is where review_id is inserted into the query at ?
    db.pool.query(query1, [review_id], (err, rows1, fields) => {
        // Send the results to the browser
<<<<<<< HEAD

        db.pool.query(query2, [review_id], (err, rows2, fields) => {
            // Send the results to the browser
            rows2 = Object.assign(rows2, rows1);
            res.json({rows2});
        });
=======
        res.json(rows);
    });

    db.pool.query(query2, [review_id], (err, rows, fields) => {
        // Send the results to the browser
        res.json(rows);
>>>>>>> ab6ca7ad0fd4f2043ed775d232307940e001c5a9
    });
});

module.exports = router;  