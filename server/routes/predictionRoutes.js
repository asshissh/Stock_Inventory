const express = require("express");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const wrapAsync = require("../middlewares/wrapAsync");
const getPrediction = require("../controller/predictioncontroller");
const router = express.Router();


router.get('/:companyId',isAuthenticated,wrapAsync(getPrediction))

module.exports = router;