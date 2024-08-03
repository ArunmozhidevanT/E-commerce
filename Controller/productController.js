const Product = require("../Model/productModel");
const { v4: uuidv4 } = require('uuid');

//add product
const addproducts = async (req,res)=>{
    try{
        const{id,title,description,category,price,image,rating}=req.body;
        const product= new Product({
            id:uuidv4(),
            title,
            description,
            category,
            price,
            image,
            rating
        })
        await product.save();
        res.send(product);

    }catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
};

//get product
const getAllproducts = async (req,res) =>{
    //console.log(req.user);
    try{
        const products = await Product.find();
        res.send(products);
    }catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
    
    
};
//update product

const updateproducts = async (req, res) => {
    try {
        const { id } = req.params; 
        const updateData = req.body; 
        const updatedProduct = await Product.findOneAndUpdate({id}, updateData, { new: true }); // Use the id directly
        if (!updatedProduct) {
            return res.status(404).send("Product not found");
        }
        res.send(updatedProduct);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};


const deleteproducts = async(req,res)=>{
    try{
        const {id}=req.params;
        const deleteProduct = await Product.findOneAndDelete({id});
        if(!deleteProduct){ 
            return res.status(404).send("product not found");
        }
        res.send('product deleted successfully');
    }catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
}; 

module.exports = {addproducts,getAllproducts,updateproducts,deleteproducts};