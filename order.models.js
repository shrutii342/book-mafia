const mongoose = require("mongoose");
const order = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
            ref:"user",
        
    },
book:{
    type:mongoose.Types.ObjectId,
    ref:"books",
},
status:{
    type:String,
    default:"order Placed",
    enum:["order placed","our for delievery,delivered,cancelled"]
},
},
{
    timestamps:true
});
module.exports=mongoose.models("order",order);