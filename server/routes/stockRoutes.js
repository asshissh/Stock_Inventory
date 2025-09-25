const express = require("express");
const wrapAsync = require('../middlewares/wrapAsync')
const { getAllStocks, getSingleStock, createStock, updateStock, deleteStock } = require("../controller/stockController");


const router = express.Router();

router.get('/',wrapAsync(getAllStocks))

router.get('/:stockId',wrapAsync(getSingleStock))

router.post('/:stockId',wrapAsync(createStock))

router.put('/:stockId',wrapAsync(updateStock))

router.delete('/:stockId',wrapAsync(deleteStock))
module.exports = router;
