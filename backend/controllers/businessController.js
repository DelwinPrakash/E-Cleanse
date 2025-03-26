import express from "express";
import bodyParser from "body-parser";
import BusinessDetails from "../models/BusinessDetails.js";
import User from "../models/User.js";

const app = express();
app.use(bodyParser.json());

const completeBusinessProfile = async (req, res) => {
    const { businessDetail, userID } = req.body;
    const { businessName, businessType, businessRegNumber, gstOrTaxNumber, phoneNumber, address, city, state, zipCode, socialAccount } = businessDetail;

    try{
        const newBusiness = await BusinessDetails.create({
            userID,
            businessName,
            businessType,
            businessRegNumber,
            gstOrTaxNumber,
            phoneNumber,
            address,
            city,
            state,
            zipCode,
            socialAccount,
        });
        
        await User.findByIdAndUpdate(userID, {profileCompletion: true});

        res.status(201).json({
            message: 'Business profile saved successfully',
            newBusiness
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save business profile', details: error.message });
    }
}

export default completeBusinessProfile;