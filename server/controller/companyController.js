const Company = require("../models/companyModel");
const mongoose = require("mongoose");

// Get all companies owned by the user
const getCompany = async (req, res) => {
  try {
    const companies = await Company.find({ owner: req.user._id });
    res.status(200).json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single company by ID
const getSingleCompany = async (req, res) => {
  const { companyId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(companyId)) {
    return res.status(404).json({ error: "No such company" });
  }

  try {
    const company = await Company.findOne({ _id: companyId, owner: req.user._id });
    if (!company) {
      return res.status(404).json({ error: "Company not found or not authorized" });
    }
    res.status(200).json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new company
const createCompany = async (req, res) => {
  const { name, address, contactEmail, contactNumber } = req.body; // fixed typo: conatactNumber -> contactNumber

  try {
    const company = await Company.create({
      name,
      address,
      contactEmail,
      contactNumber,
      owner: req.user._id,
    });
    res.status(201).json({ message: "Company created successfully", company });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a company
const updateCompany = async (req, res) => {
  const { companyId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(companyId)) {
    return res.status(404).json({ error: "Invalid company ID" });
  }

  try {
    const company = await Company.findOneAndUpdate(
      { _id: companyId, owner: req.user._id },
      req.body, // fixed: remove () after req.body
      { new: true }
    );

    if (!company) {
      return res.status(404).json({ error: "Company not found or not authorized" }); // fixed typo: josn -> json
    }

    res.status(200).json({ message: "Company updated successfully", company });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a company
const deleteCompany = async (req, res) => {
  const { companyId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(companyId)) {
    return res.status(404).json({ error: "Invalid company ID" });
  }

  try {
    const company = await Company.findOneAndDelete({ _id: companyId, owner: req.user._id });

    if (!company) {
      return res.status(404).json({ error: "Company not found or not authorized" });
    }

    res.status(200).json({ message: "Company deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getCompany,
  getSingleCompany,
  createCompany,
  updateCompany,
  deleteCompany,
};
