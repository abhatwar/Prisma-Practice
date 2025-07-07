const express = require('express');
const router = express.Router();
const productListController = require('../Controller/productListController')


router.post('/productList', productListController.productInsert);


module.exports = { router };