const mongoose = require("mongoose")

const schema = mongoose.Schema

const transactionSchema = new schema({
    sender : {type :  mongoose.Schema.Types.ObjectId, required : true, ref : "user"},
    recipient : {type : mongoose.Schema.Types.ObjectId, required : true, ref : "user"},
    amount : {type : Number, required : true},
},{timestamps : true})

module.exports = mongoose.model("Transact", transactionSchema)