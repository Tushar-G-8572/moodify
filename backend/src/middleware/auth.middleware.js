const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const blackListTokenModel = require('../models/blackListToken.model');
const redis = require('../config/cache');

async function authUser(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Authentication required" });
        }

        // const isAlreadyBlacklisted = await blackListTokenModel.findOne({token:token}).lean();

        const isAlreadyBlacklisted = await redis.get(token);

        if(isAlreadyBlacklisted) return res.status(403).json({message:"token already blacklisted"});

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = decoded; 

        next();

    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

module.exports = {authUser}