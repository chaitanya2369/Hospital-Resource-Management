const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_controller');
console.log("Home Router Loaded!");

router.get('/',homeController.home);
router.get('/gethospitals-details',homeController.hospitalDetails);
router.get('/search-resource',homeController.resourcesearch);
router.post('/search-resources',homeController.resourcesearchs);
router.post('/search-location',homeController.homepage);
router.use('/users',require('./users'));

module.exports = router;