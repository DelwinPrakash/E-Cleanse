import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const verifyEmail = async (req, res) => {
    const token = req.query.token;     //token from email

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ email: decoded.email }).exec();

        if(!user){
            return res.status(404).json({"message": "User not found!"});
        }

        // if(user.verified){
        //     return res.status(400).json({"message": "Email verified successfully!"});
        // }
        
        user.verified = true;
        user.verificationToken = null;
        await user.save();

        res.json({"message": "Email verified successfully!"});
    }catch(error){
        res.status(400).json({"message": "Invalid or expired token!"});
    }
}

export default verifyEmail;