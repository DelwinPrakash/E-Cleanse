import jwt from "jsonwebtoken";
import Business from "../models/Business.js";

const verifyBusinessJWT = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    
    if(!token){
        return res.status(401).json({"message": "No token found, unauthorized!"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("verifyJWT decode:", decoded);
        const user = await Business.findById(decoded.userID).exec();

        if(!user){
            return res.status(401).json({"message": "User not found, Unauthorized!"});
        }

        res.json({user: { 
            email: user.email,
            name: user.organizationName,
            verified: user.verified
        }})
    }catch(error){
        res.status(401).json({"message": "Token verification failed, unauthorized!"});
    }
}

export default verifyBusinessJWT;