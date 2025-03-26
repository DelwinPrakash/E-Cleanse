import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const app = express();
app.use(bodyParser.json());

const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    const foundUser = await User.findOne({email}).exec();
    if(!foundUser) return res.status(401).json({"message": "Email not found, sign up instead!"});

    const passwordMatch = await bcrypt.compare(password, foundUser.password_hash);
    if(passwordMatch){

        const token = jwt.sign({
            userID: foundUser._id,
            email: foundUser.email
        },  process.env.JWT_SECRET, {
            expiresIn: "1h"
        });
        
        console.log(`Authenticated ${foundUser.username} successfully`);
        
        if(foundUser.role === "business" && foundUser.profileCompletion === false){
            res.json({
                "success": `${foundUser.username} is logged in!`,
                token,
                user: foundUser,
                redirectTo: "/complete-business-profile"
            });
        }else{
            res.json({
                "success": `${foundUser.username} is logged in!`,
                token,
                user: foundUser,
                redirectTo: "/user"
            });
        }

    }else{
        console.log("Unauthorized!");
        res.status(401).json({"message": "Incorrect password!"});
    }
}

export default handleLogin;