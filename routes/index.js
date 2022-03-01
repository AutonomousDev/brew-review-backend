// routes/index.js

// create new Router instance for api routes
let router = require('express').Router();

// All routes for beverages are contained here.
router.use('/beverage', require('./beverage')); 
router.use('/brewery', require('./brewery'));
router.use('/category', require('./category'));
router.use('/parent-category', require('./parent-category'));
router.use('/review', require('./review'));
router.use('/tag-list', require('./tag-list'));

module.exports = router;