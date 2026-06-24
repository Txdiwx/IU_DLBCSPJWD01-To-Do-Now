const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const router = express.Router();


// REGISTER
router.post("/register", async (req,res)=>{

try{

const {name,email,password}=req.body;

const existingUser=
await User.findOne({email});

if(existingUser){

return res.status(400).json({
message:"User already exists"
});
}

const hashedPassword=
await bcrypt.hash(password,10);

const user=
await User.create({

name,
email,
password:hashedPassword

});

res.status(201).json({

message:"Account created"

});

}

catch(error){

res.status(500).json({
message:error.message
});

}

});


// LOGIN

router.post("/login",async(req,res)=>{

try{

const {email,password}=req.body;

const user=
await User.findOne({email});

if(!user){

return res.status(404).json({
message:"User not found"
});

}

const valid=
await bcrypt.compare(
password,
user.password
);

if(!valid){

return res.status(400).json({
message:"Wrong password"
});

}

const token=
jwt.sign(
{
id:user._id
},
"SECRET_KEY",
{
expiresIn:"7d"
}
);

res.json({

token,

user:{

name:user.name,
email:user.email

}

});

}

catch(error){

res.status(500).json({
message:error.message
});

}

});

module.exports=router;