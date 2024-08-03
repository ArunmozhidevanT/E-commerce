const jwt =require('jsonwebtoken');

const auth =(req,res,next) =>{
    // const token = req.header("Authorization").replace("Bearer","");
    const token =req.header("Authorization").split(" ")[1];
    if(!token) return res.status(401).json({error: "Token required"});
    try{
        const decoded =jwt.verify(token,"Y+88p4NldTYqVNWLSVKODcprx0g59PackkQWqGwxow0=");
        req.user =decoded.Email;
        console.log(decoded);
        next();
    }catch(err){
        res.status(401).json({error: "Invalid token"});
    }
};

module.exports=auth;