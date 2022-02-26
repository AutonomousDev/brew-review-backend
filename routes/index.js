// routes/index.js

// create new Router instance for api routes
let router = require('express').Router();

// All routes for beverages are contained here.
router.use('/beverage', require('./beverage')); 

module.exports = router;