const Stock = require('../models/stockModel.js');

const allData = async(req,res)=>{
    try{

        const {companyId} = req.params;
        const stocks = await Stock.find({company:companyId})
        
        if(!stocks || stocks.length===0){
            return res.status(404).json({error:"No stocks found for this company"})
        }
        const sortedStocksForTopSelling = [...stocks].sort((a,b)=>b.UnitSold - a.UnitSold)
        const topSellingProduct = sortedStocksForTopSelling[0];
        const sortedStocksForLeastSelling= [...stocks].sort((a,b)=>b.UnitSold-a.UnitSold)
        const LeastSellingProduct= sortedStocksForLeastSelling[0];
        const stocksWithRevenue = stocks.map((stock)=>({
            ...stock.doc,
            netRevenue:stock.UnitSold*stock.pricePerUnit
        }))
        const totalNetRevenue = stocksWithRevenue.reduce((total,stock)=>total+stock.netRevenue,0)
        const totalCOGS = stocks.reduce((total,stock)=>total+stock.totalUnits*stock.priceperUnit,0)
        const totalInventoryValue=stocks.reduce((total,stock)=>total+stock.totalUnits*stock.priceperUnit,0)
        const averageInverntoryValue = totalInventoryValue/stocks.length;
        const inventoryTurnover = (totalCOGS/averageInverntoryValue).toFixed(3)
        

        res.status(200).json({
            topSellingProduct,
            totalNetRevenue,
            inventoryTurnover,
            LeastSellingProduct
        })

    }catch(err){
       console.error(err)
       res.status(500).json({error:"an error occurred whiile fetching data "})
    }
}

module.exports= {allData}