const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    totalUnits:{
        type:Number,
        required:true
    },
    UnitSold:{
        type:Number,
        required:true
    },
    pricePerUnit:{
        type:Number,
        required:true
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company'
    }
})

const Stock = mongoose.model('Stock',stockSchema)
module.exports= Stock