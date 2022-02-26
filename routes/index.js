// routes/index.js

// create new Router instance for api routes
let router = require('express').Router();

router.use('/beverage', require('./beverage')); 

module.exports = router;