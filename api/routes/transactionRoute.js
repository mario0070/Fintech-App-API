const express = require("express")
const route = express.Router()
const txController = require("../controllers/transactionController")

route.get("/", txController.transactions)
route.post("/send", txController.sendTransact)
route.get("/user-transact", txController.singleTransact)

module.exports = route