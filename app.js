const express = require('express')
const app = express()
const pathProducts = require('./routes/products')
const mongoose = require('mongoose')
const port = 3000

mongoose.connect("mongodb://localhost/Randa")
.then(() =>{
    console.log("server is running .....")
})
.catch(()=>{
    console.log("server is down .....")
})

app.use(express.json())   /////////////////////////middleWare//////////////////////////
app.use("/products",pathProducts)

app.listen(port, ()=>{
    console.log(`serveris running at port : ${port}`)
    console.log(`http://localhost/:${port}`)
})