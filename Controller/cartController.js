const mongoose = require('mongoose');
const cart= require('../Model/cartModel');
const AddtoCart = async (req, res) => {
    const { product_id, quantity,price} = req.body;
    try {
      let Exuser = await cart.findOne({ Email: req.user });
      //console.log("Existing Cart:", Exuser);
  
      if (!Exuser) {
          Exuser = new cart({
          Email: req.user,
          Product: [{ "product_id":product_id,"quantity":quantity,"price":price}]
        });
        //console.log("New Cart Created:", Exuser);
      } else if (Exuser.Product && Exuser.Product.length > 0) {
        const existingProduct = Exuser.Product.find(p => p.product_id === product_id);
        //console.log("Existing Product:", existingProduct);
        if (existingProduct) {
          existingProduct.quantity += 1;
          //console.log("Updated Quantity:", existingProduct.quantity);
        } else {
          Exuser.Product.push({ "product_id":product_id, "quantity":quantity,"price":price});
          //console.log("Product Added:", { product_id, quantity, price});
        }
      } else {
        console.log("Empty Products array for existing user"); 
      } 
  
      const savedCart = await Exuser.save();
      //console.log("Saved Cart:", savedCart);
  
      res.status(200).json({
        Msg: "Successfully added or updated!",
        savedCart
      });
    } catch (error) {
      console.error("Error while adding product to cart:", error);
      res.status(500).json({
        Msg: "Server Error"
      });
    }
  };

  const Disprd=async(req,res)=>{
    try{
 
        const disp=await cart.findOne({Email:req.user}); 
        if(!disp){
            res.status(401).json({
                Msg:"User does not exist"
            }) 
        }
        
        const PData = disp.Product.map(product => ({
            product_id: product.product_id,
            quantity: product.quantity,
            price: product.price,
            total: product.quantity*product.price,
        }));
        const stotal = PData.reduce((sum,item)=> sum + item.total,0);
        return {
            Msg:"successfully fetched",
            Products:PData,
            Subtotal: stotal
        }

    }catch(err){
        res.status(500).json({
            Msg:"Serve Error"
        })
    }
  };

  const DelPrd = async (req, res) => {
    const { product_id } = req.body;
    const userEmail = req.user;
    try {
      const userCart = await cart.findOne({ Email: userEmail });
      if (!userCart) {
        return res.status(404).json({
          Msg: `Cart for user with email ${userEmail} not found`
        });
      }
      const pID= userCart.Product.findIndex(p => p.product_id === product_id);
      if (pID === -1) {
        return res.status(404).json({
          Msg: `Product with ID ${product_id} not found in the cart`
        });
      }
      if (userCart.Product[pID].quantity > 1) {
        userCart.Product[pID].quantity -= 1;
      } else {
        userCart.Product.splice(pID, 1);
      }
      if(userCart.Product.length==0){
        const DelC=await cart.deleteOne({Email:userEmail})
        if(!DelC){
            res.status(404).json({
            Msg: `something went wrong`
          });
        }
        res.status(200).json({
          Msg:"Successfully Droped cart"
        })
      }
      await userCart.save();
      return res.status(200).json({
        Msg: `Successfully deleted product with ID ${product_id}`
      });
    } catch (err) {
      console.error('Server Error:', err); 
      res.status(500).json({
          Msg: "Server Error",
          Error: err.message 
        });
      }
    }
  
  module.exports = { AddtoCart,Disprd,DelPrd };