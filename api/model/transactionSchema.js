const mongoose = require("mongoose")

const schema = mongoose.Schema

const transactionSchema = new schema({
    sender : {type :  mongoose.Schema.Types.ObjectId, required : true, ref : "User"},
    recipient : {type : mongoose.Schema.Types.ObjectId, required : true, ref : "User"},
    amount : {type : Number, required : true},
},{timestamps : true})

module.exports = mongoose.model("Transact", transactionSchema)