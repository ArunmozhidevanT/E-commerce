const express = require("express");
const app = express();
const productroutes =require("./routes/productRoutes")
const userroutes = require("./routes/userRoutes")
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors");

app.use(cors({
    origin:"http://localhost:5173/"
}));
app.use(bodyParser.json());
app.use(express.json());
mongoose.connect(
    "mongodb+srv://arunmozhidevant:ecom@cluster0.mqhcwfk.mongodb.net/ecommerce"
)
.then(()=>{
    console.log("Mongodb connected")
});
app.set("view engine","ejs");
app.use("/", productroutes);
app.use("/",userroutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

