const order = require("../Model/orderModel");
const  cart = require('../Model/cartModel');
const { v4: uuidv4 } = require('uuid');
//const { Disprd } = require("../Controller/cartController");


const createorder = async(req,res)=>{
    const {Name, phno, address}=req.body;
    const Email=req.user;
    if (!Email) {
        return res.status(400).json({ message: "User email is required" });
      }
  
    try {
        const userCart = await cart.findOne({Email});
        if (!userCart) {
            return res.status(404).json({ msg: "Cart not found" });
        }
        const Products = userCart.Product.map(product => ({
            product_id: product.product_id,
            quantity: product.quantity,
            price: product.price,
            total: product.quantity * product.price,
        }));
        const Subtotal = Products.reduce((sum, item) => sum + item.total, 0);
        const currentDate = new Date();
        const expectedDeliveryDate = new Date(currentDate);
        expectedDeliveryDate.setDate(currentDate.getDate() + 10);

        const newOrder = new order({
            order_id:uuidv4(),
            Email,
            Name:Name,
            phno:phno,
            address:address,
            orderDate: currentDate,
            ExtDate: expectedDeliveryDate,
            Product: Products,
            Totalamount:Subtotal,
            status: "In progress"
        });
        
        await newOrder.save();
        await cart.deleteOne({Email});
        if (!res.headersSent) {
            res.status(201).json({ message: 'Order created successfully', order });
          }
    
    } catch (err) {
        console.error("Error while create an order", err);
        if (!res.headersSent) {
            res.status(500).json({ message: `Server error: ${err.message}` });
          }    
    }
};

const GetOrder=async(req,res)=>{
    try{
        const Email = req.user;
        if (!Email) {
          return res.status(400).json({ message: "User email is required" });
        }
        const Orders=await order.find({Email})
        res.status(200).json({
            Orders:Orders
        })
    }catch(err){
        res.status(500).json({
            Msg:"server error",
            Error:err
        })
    }
  }


module.exports = {createorder,GetOrder}