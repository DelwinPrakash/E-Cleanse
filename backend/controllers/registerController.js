import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const app = express();
app.use(bodyParser.json());

const handleNewuser = async (req, res) => {
    const { username, email, password, role } = req.body;
    console.log(username, password, email, "from registerController");
    
    const duplicate = await User.findOne({email}).exec();
    if(duplicate){
        return res.status(409).json({"message": "User with this email already exist!"});
    }

    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const verificationToken = jwt.sign({ email },  process.env.JWT_SECRET, { expiresIn: "1h" });

        const result = await User.create({
            // auth_method: "email",
            username,
            email,
            password_hash: hashedPassword,
            role,
            // profile: {
            //     name: username
            // },
            verified: false,
            verificationToken
        });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_ID,
            to: email,
            subject: "Email Verification - E-COLLECT",
            // html: `
            //     <h1>Verify Your Email Address</h1>
            //     <p>Hi ${username},</p>
            //     <p>Thank you for signing up, to complete your registration, please verify your email address by clicking the button below.</p>
            //     <a href="http://localhost:5173/verify-email?token=${verificationToken}">Verify My Email</a>
            //     <p>If you didn't sign up for this account, you can safely ignore this email.</p>
            //     <p>Best regards, <br> E-COLLECT</p>
            // `
            html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Verification</title>
                </head>
                <body style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #333; text-align: center; font-size: 24px; margin-bottom: 20px;">
                    Verify Your Email Address
                </h1>
                <p style="font-size: 16px; line-height: 1.5; color: #555;">Hi ${username},</p>
                <p style="font-size: 16px; line-height: 1.5; color: #555;">
                    Thank you for signing up! To complete your registration, please verify your email address by clicking the button below.
                </p>
                <a href="http://localhost:5173/verify-email?token=${verificationToken}" style="
                    display: inline-block; 
                    padding: 10px 20px; 
                    background-color: #4CAF50; 
                    color: #fff; 
                    text-decoration: none; 
                    border-radius: 5px; 
                    text-align: center; 
                    font-size: 16px; 
                    margin: 20px 0;">
                    Verify My Email
                </a>
                <p style="font-size: 16px; line-height: 1.5; color: #555;">
                    If you didn't sign up for this account, you can safely ignore this email.
                </p>
                <p style="font-size: 16px; line-height: 1.5; color: #555;">
                    Best regards, <br>
                    E-COLLECT
                </p>
                </body>
                </html>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log(error);
            }
        });

        // console.log(result);
        // res.status(201).json({"message": `New user ${username} created successfully`})
        res.status(201).json({
            "message": `New user ${username} created successfully. Check your email to verify your account.`,
            // token,
            // user:{
            //     email: result.email,
            //     name: result.profile.name
            // }
        });
    }catch(error){
        res.status(500).json({"message": error.message})
    }
}

export default handleNewuser;