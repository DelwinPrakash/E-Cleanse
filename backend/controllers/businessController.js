import BusinessDetails from "../models/BusinessDetails.js";
import User from "../models/User.js";

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

const getBusinessDetails = async (req, res) => {
    const userID = req.params.userID

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

export { completeBusinessProfile, getBusinessDetails };