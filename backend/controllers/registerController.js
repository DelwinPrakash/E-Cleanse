import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt"
import User from "../models/User.js"

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
        const password_hash = await bcrypt.hash(password, 10);

        const result = await User.create({
            auth_method: "email",
            email,
            password_hash,
            profile: {
                name: username
            }
        });
        console.log(result);
        res.status(201).json({"message": `New user ${username} created successfully`})
    }catch(error){
        res.status(500).json({"message": error.message})
    }
}

export default handleNewuser;