var express = require('express');
var router = express.Router();
var productsControllers=require('../controllers/productsControllers')

/* GET home page. */
router.get('/detail/:id/:category',productsControllers.producto);

module.exports = router;
