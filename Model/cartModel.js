const mongoose = require('mongoose');
const Cartmodel = new mongoose.Schema({
    Email:{
        type:String,
        require:true
    },
    Product:[
        {
            product_id: String,
            quantity: Number,
            price: Number
        }
    ]

});
const cart = mongoose.model("carts", Cartmodel);
module.exports = cart;