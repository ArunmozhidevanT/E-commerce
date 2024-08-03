const express = require("express");
const router = express.Router();
const productController = require("../Controller/productController");
const cartController = require("../Controller/cartController");
const orderController =require("../Controller/orderController")
const auth =require("../Middleware/auth");

//Product Routes
router.get("/products",auth, productController.getAllproducts);
router.post("/addproduct", productController.addproducts);
router.put("/updateproduct/:id", productController.updateproducts);
router.delete("/deleteproduct/:id",productController.deleteproducts);

//Cart Routes
router.post("/AddtoCart",auth,cartController.AddtoCart);
router.get("/Disprd",auth,cartController.Disprd);
router.delete("/DelPrd",auth,cartController.DelPrd);

//Order Routes
router.post("/createorder",auth,orderController.createorder);
router.get("/getorder",auth,orderController.GetOrder);


module.exports = router;