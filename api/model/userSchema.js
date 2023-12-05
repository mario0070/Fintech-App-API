const mongoose = require("mongoose")

const schema = mongoose.Schema

const userSchema = new schema({
    firstname : {type : String, default : null},
    lastname : {type : String, default : null},
    email : {type : String, required : true},
    password : {type : String, required : true},
    profilePic : {type : String, default : null},
})

module.exports = mongoose.model("User", userSchema)