const express = require("express")
const route = express.Router()
const userController = require("../controllers/userController")
const checkAuth = require("../middleware/check-auth")

route.get("/", checkAuth, userController.getAllUser)
route.post("/signup", userController.createUser)
route.post("/login", userController.loginUser)

module.exports = route