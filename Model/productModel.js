const mongoose = require('mongoose');
const {v4:uuidv4}=require('uuid')
const productSchema =  new mongoose.Schema({
    id: {
        type: String,
        unique:true
    },
    title:{
        type: String,
        required: [true,"title is required"],
    },
    description:{
        type: String,
        required: true
    },
    category:{
        type: String,
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String,
    },
    rating:{
        rate:{
            type:Number
        },
        count:{
            type:Number
        }
    },
})

const Product = mongoose.model("products",productSchema);

module.exports = Product
