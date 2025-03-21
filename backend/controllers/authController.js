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

    const passwordMatch = bcrypt.compare(password, foundUser.password_hash);
    if(passwordMatch){

        const token = jwt.sign({
            userID: foundUser._id,
            email: foundUser.email
        },  process.env.JWT_SECRET, {
            expiresIn: "1h"
        });
        
        console.log(`Authenticated ${foundUser.username} successfully`);
        // res.json({"success": `${foundUser.profile.name} is logged in!`});
        res.json({
            "success": `${foundUser.username} is logged in!`,
            token,
            user: {
                email: foundUser.email,
                name: foundUser.username,
                verified: foundUser.verified,
                role: foundUser.role
            }
        });
    }else{
        console.log("Unauthorized!");
        res.status(401).json({"message": "Incorrect password!"});
    }
}

export default handleLogin;