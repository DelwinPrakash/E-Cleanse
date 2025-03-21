import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./backend/config/db.js";
import mongoose from "mongoose";
import handleNewuser from "./backend/controllers/registerController.js";
import handleLogin from "./backend/controllers/authController.js";
import verifyJWT from "./backend/controllers/verifyJWT.js";
import verifyEmail from "./backend/controllers/verifyEmail.js";

const app = express();

app.use(bodyParser.json());
app.use(cors());

connectDB();

// app.post("/api/login", (req, res) => {
//     const { email, password } = req.body;
//     console.log("login", email, password)
// });

app.get("/api/verify-email", verifyEmail);

app.get("/api/verify", verifyJWT);

app.post("/api/login", handleLogin);

app.post("/api/signup", handleNewuser)

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(3000);
})

// app.listen(3000, () => {
//     console.log("Server is running on 3000");
// });