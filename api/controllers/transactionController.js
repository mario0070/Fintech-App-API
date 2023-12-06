const transactionSchema = require("../model/transactionSchema")
const userSchema = require("../model/userSchema")

const transactions = (req, res) => {
   transactionSchema.find()
   .populate("recipient")
   .then(data => {
        res.status(200).json({
            data
        })
   })
   .catch(err => {
    res.status(500).json({
        error : err
    })
})
}

const sendTransact = (req, res) => {
    userSchema.findById(req.body.recipient)
    .then(transact_recepient => {
        userSchema.findById(req.body.sender)
        .then(sender => {
            if(req.body.amount < sender.balance){
                if(transact_recepient){
                    const tx = new transactionSchema({
                        amount : req.body.amount,
                        recipient : req.body.recipient,
                        sender : req.body.sender,
                    })
                    tx.save()
                    .then(data => {
                        const add_ops = parseInt(transact_recepient.balance) + parseInt(req.body.amount)
                        userSchema.findByIdAndUpdate(req.body.recipient, {"balance" : add_ops  })
                        .then(updated => {
                            const deduct_ops = parseInt(sender.balance) - parseInt(req.body.amount)
                            userSchema.findByIdAndUpdate(req.body.sender, {"balance" : deduct_ops  })
                            .then(updated => {
                                res.status(200).json({message : "transaction was successful"})
                            })
                        })
                        .catch(err => {
                            res.status(500).json({err})
                        })

                       
                    })
                    .catch(error => {
                        res.status(500).json({error})
                    })
        
                }else{
                    res.status(200).json({
                        message : "user does not exist"
                    })
                }
            }
            else{
                res.status(403).json({
                    message : "insufficient balance"
                })
            }
        })
        
    })
    .catch(err => {
        res.status(500).json({
            error : err
        })
    })
    
}

module.exports = {
    transactions,
    sendTransact,
}