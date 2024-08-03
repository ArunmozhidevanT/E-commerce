const users=require("../Model/usermodel.js")
const mongoose=require('mongoose')
const bcrypt=require("bcryptjs")
const JWT =require('jsonwebtoken')
const auth = require("../Middleware/auth.js")
const createUser = async (req, res) => {
    const { username, Email, PhoneNo, Password } = req.body;
    
    try {
        const existingUser = await users.findOne({ Email });
        if (existingUser) {
            return res.status(400).json({ Msg: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(Password, 10);
        const newUser = new users({
            username,
            Email,
            PhoneNo,
            Password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({
            Msg: "New user created",
            New: newUser
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            Msg: "Server Error",
            error: err
        });
    }
};

const VerUSer = async (req, res) => {
    const { Email, Password } = req.body;
    try {
      const ver = await users.findOne({Email});
      if (ver) {
        const isMatch = await bcrypt.compare(Password, ver.Password);
        if (isMatch) {
            const Token=JWT.sign({Email},"Y+88p4NldTYqVNWLSVKODcprx0g59PackkQWqGwxow0=",{
                expiresIn:"2h",
            })
            if(!Token){
                res.send("you are an unauthorized user!")
            }
            return res.status(200).json({
            Msg: "Login Successful",
            Email,
            Password,
            Token,
          });
        } else {
          return res.status(401).json({
            Msg: "Invalid credentials",
          });
        }
      } else {
        return res.status(401).json({
          Msg: "Invalid credentials",
        });
      }
    } catch (err) {
      return res.status(500).json({
        Msg: "Server error",
        error: err,
      });
    }
  };
  

module.exports = {createUser,VerUSer}