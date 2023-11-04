const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const userRoute = require("./Routes/user")
const blogRoute = require("./Routes/blog")

app.use(morgan('tiny'))
app.use(express.json())

mongoose.connect("mongodb+srv://blog:blog@cluster0.rihhmnm.mongodb.net/").then(console.log('Mongodb conneted')).catch((err)=>console.log(err))


app.get('/',(req,res)=>{
    res.send(['zunair','khan'])
})


app.use('/user',userRoute)
app.use('/blog',blogRoute)
app.listen(3000,()=>{
    console.log("App is running on port 3000");
})