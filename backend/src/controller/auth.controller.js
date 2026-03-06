const blackListTokenModel = require('../models/blackListToken.model');
const userModel = require('../models/user.model');
const jwt = require("jsonwebtoken");
const {sendRegistrationEmail,sendOTP} = require('../services/email.service'); 
const crypto = require('crypto');
const bcrypt = require('bcrypt')
const redis = require('../config/cache');

function generateOTP(){
    return crypto.randomInt(100000,999999).toString();
} 


 const registerController = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) return res.status(401).json({ message: "All fields required" });

        const isAlreadyExists = await userModel.findOne({
            $or: [{ username }, { email }]
        });
        if (isAlreadyExists) return res.status(401).json({ message: isAlreadyExists.email == email ? "Email already exists" : "Username already exists" })

        const otp = generateOTP();
        const hashedOTP = await bcrypt.hash(otp,10);

        await redis.set(
            `otp:${email}`,
            JSON.stringify({
                username,
                email,
                password,
                otp:hashedOTP
            }),
            "EX",300
        )

        await sendOTP(email,username,otp);

        res.status(200).json({message:"Otp send on your mail please verify"})


    } catch (err) {
        
        return res.status(500).json({ message: "Error in register Block",error:err })
    }

}

const otpVerificationController = async(req,res)=>{

    const {email,otp} = req.body;

    const data = await redis.get(`otp:${email}`);

    if(!data) return res.status(401).json({message:"OTP expired"});

    const parsedData = JSON.parse(data);

    const matched = await bcrypt.compare(otp,parsedData.otp);

    if(!matched) return res.status(400).json({message:"Invalid OTP"});

    const user = await userModel.create({
            username:parsedData.username,
            email:parsedData.email,
            password:parsedData.password
        });

        await redis.del(`otp:${email}`);

        const token = jwt.sign({
            id: user._id,
            username: user.username
        },
            process.env.JWT_SECRET,
            { expiresIn: "2d" }
        );

        
        await sendRegistrationEmail(user.username,user.email);

        res.cookie('token', token);
        
        res.status(201).json({
            message: "User registered",
            user:{
                username:user.username,
                email:user.email
            }
        })
}

 const loginController = async (req,res) => {
    const {username,email,password} = req.body;
    try{
       
        if(!password) return res.status(401).json({message:"password is required for login"});

        const user = await userModel.findOne({
            $or:[{username},{email}]
        }).select("+password");

        if(!user) return res.status(400).json({message:"Invalid credentials"});

        const isPassword = user.compare(password);
        if(!isPassword) return res.status(400).json({message:"Invalid credentials"});

        const token = jwt.sign({
            id:user._id,
            username:user.username
        },
        process.env.JWT_SECRET,
        {expiresIn:"2d"}
    );

    res.cookie('token',token);

    res.status(200).json({message:"User logged IN",
        user:{
            username:user.username,
            email:user.email
        }
    })

    }catch(err){
        
        res.status(500).json({message:"Error while looged in",error:err});
    }
 }

 async function logoutController(req,res){
    try{

        const token = req.cookies.token;
        if(!token) return res.status(401).json({message:"token needed"});
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded) return res.status(400).json({message:"Inavlid token"});

        // const expiresAt = new Date(decoded.exp * 1000);

        // await blackListTokenModel.create({
        //     token:token,
        //     expiresAt:expiresAt
        // });

        await redis.set(token,Date.now().toString(),"EX",60*60);

        res.clearCookie("token");
        res.status(200).json({message:"User logged Out"});

    }catch(err){
        
        return res.status(401).json({message:"Error while loggedOut",error:err});
    }
    
    
 }

 module.exports = {registerController,loginController,logoutController,otpVerificationController}