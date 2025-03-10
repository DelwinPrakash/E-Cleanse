import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt"
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const app = express();
app.use(bodyParser.json());

const handleNewuser = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(username, password, email, "from registerController");
    
    const duplicate = await User.findOne({email}).exec();
    if(duplicate){
        return res.status(409).json({"message": "User with this email already exist!"});
    }

    try{
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await User.create({
            auth_method: "email",
            email,
            password_hash: hashedPassword,
            profile: {
                name: username
            }
        });

        const token = jwt.sign({
            userID: result._id,
            email: result.email
        },  process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        console.log(result);
        // res.status(201).json({"message": `New user ${username} created successfully`})
        res.status(201).json({
            "message": `New user ${username} created successfully`,
            token,
            user:{
                email: result.email,
                name: result.profile.name
            }
        })
    }catch(error){
        res.status(500).json({"message": error.message})
    }
}

export default handleNewuser;