const blackListTokenModel = require('../models/blackListToken.model');
const userModel = require('../models/user.model');
const jwt = require("jsonwebtoken");


 const registerController = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) return res.status(401).json({ message: "All fields required" });

        const isAlreadyExists = await userModel.findOne({
            $or: [{ username }, { email }]
        });
        if (isAlreadyExists) return res.status(401).json({ message: isAlreadyExists.email == email ? "Email already exists" : "Username already exists" })

        const user = await userModel.create({
            username,
            email,
            password
        });

        const token = jwt.sign({
            id: user._id,
            username: user.username
        },
            process.env.JWT_SECRET,
            { expiresIn: "2d" }
        );

        res.cookie('token', token);
        res.status(201).json({
            message: "User registered",
            user: user
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error in register Block" })
    }

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
        user:user
    })

    }catch(err){
        console.log(err);
        res.status(500).json({message:"Error while looged in"});
    }
 }

 async function logoutController(req,res){
    try{

        const token = req.cookies.token;
        if(!token) return res.status(401).json({message:"token needed"});
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        const expiresAt = new Date(decoded.exp * 1000);

        await blackListTokenModel.create({
            token:token,
            expiresAt:expiresAt
        });

        res.clearCookie("token");
        res.status(200).json({message:"User logged Out"});

    }catch(err){
        console.log(err);
        return res.status(401).json({message:"Error while loggedOut"});
    }
    
    
 }

 module.exports = {registerController,loginController,logoutController}