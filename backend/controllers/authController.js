import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const app = express();
app.use(bodyParser.json());

const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    const foundUser = await User.findOne({email}).exec();
    if(!foundUser) return res.status(401).json({"message": "Email not found!"});

    const password_match = await bcrypt.compare(password, foundUser.password_hash);
    if(password_match){
        console.log(`Authenticated ${foundUser.profile.name} successfully`);
        res.json({"success": `${foundUser.profile.name} is logged in!`});
    }else{
        console.log("Unauthorized!");
        res.status(401).json({"message": "Incorrect password!"});
    }
}

export default handleLogin;