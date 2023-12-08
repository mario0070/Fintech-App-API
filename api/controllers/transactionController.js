const transactionSchema = require("../model/transactionSchema")
const userSchema = require("../model/userSchema")

const transactions = (req, res) => {
   transactionSchema.find()
   .sort({createdAt : "desc"})
   .populate("recipient")
   .populate("sender")
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
        })
        
    })
    .catch(err => {
        res.status(500).json({
            error : err
        })
    })
    
}

const singleTransact = (req, res) => {
    userSchema.findById(req.body.id)
    .then(user => {
        if(user){
            transactionSchema.find({recipient : req.body.id})
            .populate("sender")
            .populate("recipient")
            .then(credit_tx => {
                transactionSchema.find({sender : req.body.id})
                .populate("sender")
                .populate("recipient")
                .then(debit_tx => {
                    res.status(200).json({
                        total : credit_tx.length + debit_tx.length,
                        debit_transact : debit_tx,
                        credit_transact : credit_tx
                    })
                })
               
            })
            .catch(err => res.status(404).json({error : err}))
        }else{
            res.status(404).json({message : "user does not exist"})
        }
        
    })
    .catch(err => res.status(500).json({error : err}))
}

const deposit = (req, res) => {
    userSchema.find({"email": req.body.email})
    .then(user => {
        const tx = new transactionSchema({
            amount : req.body.amount,
            recipient : user[0]._id,
            sender : "657353f3184167506e1816ab",
        })
        tx.save()
        .then(data => {
            const add_ops = parseInt(user[0].balance) + parseInt(req.body.amount)
            userSchema.findByIdAndUpdate(user[0]._id, {"balance" : add_ops  })
            .then(updated => {
                res.status(200).json({message : "updated"})
            })
            .catch(err => {
                res.status(500).json({err})
            })

            
        })
        .catch(error => {
            res.status(500).json({error})
        })

    })
    .catch(err => {
        res.status(500).json({error : err})
    })
}
 

module.exports = {
    transactions,
    sendTransact,
    singleTransact,
    deposit,
}