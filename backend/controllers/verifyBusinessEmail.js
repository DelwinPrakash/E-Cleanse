import jwt from 'jsonwebtoken';
import Business from '../models/Business.js';

const verifyBusinessEmail = async (req, res) => {
    const token = req.query.token;     //token from email

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Business.findOne({ email: decoded.email }).exec();

        if(!user){
            return res.status(404).json({"message": "Business user not found!"});
        }

        user.verified = true;
        user.verificationToken = null;
        await user.save();

        res.json({"message": "Email verified successfully!"});
    }catch(error){
        res.status(400).json({"message": "Invalid or expired token!"});
    }
}

export default verifyBusinessEmail;