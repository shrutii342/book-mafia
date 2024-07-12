const express=require("express");
const app = express();
const connectwithDB = require("./conn/conn")
connectwithDB();
app.get('/' ,async (req,res)=>{
    res.send("seene main angar hain")

    })


//creating port
app.listen(1000 ,()=>{
    console.log("my server is running on port 1000");
})
