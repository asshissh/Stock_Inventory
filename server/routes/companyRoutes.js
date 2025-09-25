const express = require("express");
const wrapAsync = require("../middlewares/wrapAsync")
const {
  getCompany,
  getSingleCompany,
  createCompany,
  updateCompany,
  deleteCompany,
} = require("../controller/companyController");
const { create } = require("../models/companyModel");
const { isAuthenticated } = require("../middlewares/authMiddleware");


const router = express.Router();


//get all companies
router.get("/",isAuthenticated,wrapAsync(getCompany))

//create a company

router.post("/",isAuthenticated,wrapAsync(createCompany))

//get a company by id 

router.get("/:companyId",isAuthenticated,wrapAsync(getSingleCompany))

//update company

router.put("/:companyId",isAuthenticated,wrapAsync(updateCompany))

//delete a company
router.delete("/:companyId",isAuthenticated,wrapAsync(deleteCompany))
module.exports = router;

