import jwt from "jsonwebtoken";
import User from "../models/User.js";

const verifyJWT = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    
    if(!token){
        return res.status(401).json({"message": "No token found, unauthorized!"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userID).exec();

        console.log("verifyJWT", user);
        if(!user){
            return res.status(401).json({"message": "User not found, Unauthorized!"});
        }

        res.json({user: user});
    }catch(error){
        res.status(401).json({"message": "Token verification failed, unauthorized!"});
    }
}

export default verifyJWT;