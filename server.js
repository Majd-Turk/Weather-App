const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const api = require("./routes/api")

const app = express()

app.use(express.static(path.join(__dirname, "dist")))
app.use(express.static(path.join(__dirname, "node_modules")))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/", api)

mongoose.connect("mongodb://127.0.0.1:27017/weather-app")

const port = 3200
app.listen(port, function () {
  console.log(`Server running on ${port}`)
})