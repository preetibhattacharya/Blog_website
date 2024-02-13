require("dotenv").config();

const express = require("express")
const expresslayout = require("express-ejs-layouts")
const connectDB =require("./server/config/db")

const router= require("./server/routes/main")
const app = express()
const PORT = 5002 || process.env.PORT
//const path = require("path")
connectDB()

app.use(express.urlencoded({extended:true}))
app.use(express.json())

//middlewares
app.use(express.static("public"))
app.use(expresslayout)

app.set("layout", "./layouts/main")
app.set("view engine", "ejs")
//app.set("views",path.join(__dirname,"views"))

app.use("/",router )


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})