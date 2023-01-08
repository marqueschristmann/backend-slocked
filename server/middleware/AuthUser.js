import User from "../models/UserModel.js";

import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) return res.sendStatus(403);
        req.email = decoded.email;
        next();
    })
}

export const verifyUser = async (req, res, next) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Please login to your account!"});
    }
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User not found"});
    req.userId = user.id;
    req.role = user.role; 
    next();
}

export const adminOnly = async (req, res, next) =>{
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User not found"});
    if(user.role !== "admin") return res.status(403).json({msg: "Forbidden access"});
    next();
}