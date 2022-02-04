const express = require("express")
const app = express()
const cors = require("cors")
const port = process.env.PORT || 3000
const router = require("./routes")

require("dotenv").config()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/api/v1", router)

app.listen(port, console.log(`localhost:${port}`))