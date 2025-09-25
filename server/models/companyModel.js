const { type } = require('express/lib/response')
const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true,
    },
    contactAddress:{
        type:String,
        require:true,
    },
    contactEmail:{
        type:String,
        require:true
    },
    contactNumber:{
        type:Number,
        require:true,
    },
    owner:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        require:true
    }


})
const Company =mongoose.model("Company",companySchema)
module.exports  = Company