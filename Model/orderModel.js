const mongoose = require('mongoose');

const ordermodel = new mongoose.Schema({
    Email:{
        type:String,
        required:true
    },
    Name:{
        type:String,
        required:true
    },
    phno:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    orderDate:{
        type:Date
    },
    ExtDate:{
        type:Date
    },
    Product:[
        {
            product_id: String,
            quantity: Number,
            price: Number
        }
    ],
    Totalamount:{
        type:Number
    },
    status:{
        type:String,
        default: "Pending"
    }

});

const order = mongoose.model("order",ordermodel);
module.exports = order;