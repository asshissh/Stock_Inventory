const express = require("express");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const wrapAsync = require("../middlewares/wrapAsync");
const { allData } = require("../controller/dataController");
const router = express.Router()


router.get('/:companyId' ,isAuthenticated,wrapAsync(allData))

module.exports = router;