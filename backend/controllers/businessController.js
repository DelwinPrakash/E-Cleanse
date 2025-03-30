import BusinessDetails from "../models/BusinessDetails.js";
import User from "../models/User.js";
import UserDetails from "../models/UserDetails.js";

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
            newBusiness     //no need, please remove later
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save business profile', details: error.message });
    }
}

const getBusinessDetails = async (req, res) => {
    const userID = req.params.userID;

    try{
        const businessDetails = await BusinessDetails.findOne({ userID }).exec();
        
        if(!businessDetails){
            return res.status(404).json({message: "User details not found!"});
        }
        
        res.status(200).json({
            success: true,
            businessDetails
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch user details!",
            error: error.message
        })
    }
}

const updateUserStatus = async (req, res) => {      //when the business accepts the order
    const userID = req.params.userID;
    try {
        const updatedUserStatus = await UserDetails.findOneAndUpdate({_id: userID}, {status: "accepted"});
        if (!updatedUserStatus) {
            return res.status(404).json({ message: "User details not found" });
        }
        res.status(200).json({ message: "Status updated successfully", updatedUserStatus });
    } catch (error) {
        res.status(500).json({ message: "Failed to update status", error: error.message });
    }
}

export { completeBusinessProfile, getBusinessDetails, updateUserStatus };