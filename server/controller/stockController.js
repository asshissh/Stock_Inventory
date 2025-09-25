const Stock = require("../models/stockModel.js");
const mongoose = require("mongoose");

//Get all stocks for a company
const getAllStocks = async (req, res) => {
  const { companyId } = req.parms;
  if (!mongoose.Types.ObjectId.isValid(companyId)) {
    return res.status(404).json({ error: "Invalid company ID" });
  }
  try {
    const stocks = await Stock.find({ company: companyId });
    res.status(200).json(stocks);
  } catch (error) {
    res.status(402).json({ error: error.message });
  }
};

//get single stock
const getSingleStock = async (req, res) => {
  const { companyId, stockId } = req.params;
  if (
    !mongoose.Types.ObjectId.isValid(companyId) ||
    !mongoose.Types.ObjectId.isValid(stockId)
  ) {
    return res.status(404).json({ error: "Invalid company ID" });
  }
  try {
    const stock = await Stock.findOne({ _id: stockId, company: companyId });
    if (!stock) {
      return res
        .status(404)
        .json({ error: "Stock not found for this company" });
    }
    res, status(200).json(stock);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

//create new Stock
const createStock = async (req, res) => {
  const { companyId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(companyId)) {
    return res.status(404).json({ error: "Invalid company Id" });
  }
  const { name, description, pricePerUnit, totalUnits, UnitSold } = req.body;
  try {
    const stock = new Stock({
      name,
      description,
      pricePerUnit,
      totalUnits,
      UnitSold,
      company: companyId,
    });
    await stock.save();
    res.status(201).json(stock);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//update the stock

const updateStock = async (req, res) => {
  const { companyId, stockId } = req.params;
  if (
    !mongoose.Types.ObjectId.isValid(companyId) ||
    !mongoose.Types.ObjectId.isValid(stockId)
  ) {
    return res.status(401).json({ error: "Invalid IDs" });
  }
  const updateData = { ...req.body };
  delete updateData._id;
  try {
    const stock = await Stock.findOneAndUpdate(
      {
        _id: stockId,
        company: companyId,
      },
      update,
      { new: true, runValidators: true }
    );
    if(!stock){
      return res.status(401).json({error:"No stock find for this company"})
    }
  } catch (error) {
    res.status(402).json({ error: error.message });
  }
};

//delete stock

const deleteStock = async(req,res)=>{
  const {companyId,stockId} = req.params;
  if(!mongoose.Types.ObjectId.isValid(companyId) || !mongoose.Types.ObjectId.isValid(stockId)){
    return res.status(400).json({error:"Invalid Ids"})
  }
  try{
    const stock = await Stock.findOneAndDelete({_id:stockId,company:companyId})
    if(!stock){
      return res.status(404).json({error:"No stock found for this company"})
    }
    res.status(200).json(stock)

  }catch(error){
    res.status(401).json({error:error.message})
  }
}
module.exports = {
  getAllStocks,
  getSingleStock,
  createStock,
  updateStock,
  deleteStock
}