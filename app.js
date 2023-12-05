const express = require("express")
const app = express()
const userRoutes = require("./api/routes/user")
const morgan = require("morgan")

app.use(express.json())
app.use(morgan("dev"))
app.use(express.urlencoded({extended:true}))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    next()
})

app.get("/", (req, res) => {
    res.status(200).json({
        message : "welcome to fintech web app api",
        version : "1.0",
        author : "muhammadjamiu"
    })
})

app.use("/user", userRoutes)

app.use((req, res) => {
    res.status(404).json({
        message : "Endpoint not found"
    })
})

module.exports = app