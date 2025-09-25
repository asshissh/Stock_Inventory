const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    totalUnits:{
        type:String,
        required:true
    },
    UnitSold:{
        type:String,
        required:true
    },
    priceperUnit:{
        type:String,
        required:true
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company'
    }
})

const Stock = mongoose.model('Stock',stockSchema)
module.exports= Stock