import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./backend/config/db.js";
import mongoose from "mongoose";
import handleNewuser from "./backend/controllers/registerController.js";
import handleLogin from "./backend/controllers/authController.js";
import verifyJWT from "./backend/controllers/verifyJWT.js";
import verifyEmail from "./backend/controllers/verifyEmail.js";
import { completeBusinessProfile, getBusinessDetails, getBusinessProfile, recycleItem, updateUserStatus } from "./backend/controllers/businessController.js";
import { RecycleWaste, getAllUsers, getUserProfile, getUserPendingItems } from "./backend/controllers/userController.js";

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

app.post("/api/complete-business-profile", completeBusinessProfile);

app.get("/api/business-details/:userID", getBusinessDetails)

app.post("/api/recycle-waste", RecycleWaste);

app.get("/api/user-details", getAllUsers);

app.put("/api/user-details/:userID", updateUserStatus);

app.post("/api/recycle-item", recycleItem);

app.get("/api/business-profile/:userID", getBusinessProfile);

app.get("/api/user-profile/:userID", getUserProfile);

app.get("/api/user-profile/pending/:userID", getUserPendingItems);

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(3000);
})

// app.listen(3000, () => {
//     console.log("Server is running on 3000");
// });