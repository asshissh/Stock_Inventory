import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema({
  userId: String,
  stocks: [
    {
      symbol: String,
      quantity: Number,
      avgPrice: Number
    }
  ]
});

export default mongoose.model("Portfolio", portfolioSchema);
