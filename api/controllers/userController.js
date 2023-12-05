const userSchema = require("../model/userSchema")
const bcrypt = require("bcrypt")

const createUser = (req, res) => {
    userSchema.find({email : req.body.email})
    .then(result => {
       if(result.length >= 1){
            res.status(200).json({
                message : "User already exist"
            })
       }else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(hash){
                    const user = new userSchema({
                        firstname : req.body.firstname,
                        lastname : req.body.lastname,
                        password : hash,
                        email : req.body.email,
                        profilePic : req.body.profilePic,
                    })
                
                    user.save()
                    .then(data => {
                        res.status(200).json({
                            message : "user created successfully",
                            data
                        })
                    })
                    .catch( err => {
                        res.status(500).json({
                            message: err
                        })
                    })
                }else{
                    res.status(500).json({
                        message: "Something went wrong"
                    })
                }
            })
       }
    })
    .catch(err => {
        res.status(500).json({
            message : err
        })
    })

   
}


const getAllUser = (req, res) => {
    res.json({
        message : "all  user"
    })
}

module.exports = {
    createUser, 
    getAllUser,
}