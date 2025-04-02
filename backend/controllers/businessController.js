import mongoose from "mongoose";
import BusinessDetails from "../models/BusinessDetails.js";
import RecycleItem from "../models/RecycleItem.js";
import User from "../models/User.js";
import UserDetails from "../models/UserDetails.js";

const { ObjectId } = mongoose.Types;

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
            return res.status(404).json({message: "Business details not found!"});
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
    const { status, businessID } = req.body;
    let updatedUserStatus;
    try {
        // const updatedUserStatus = await UserDetails.findOneAndUpdate({_id: userID}, {status, businessID});
        if(status === "accepted"){
            updatedUserStatus = await UserDetails.findOneAndUpdate({_id: userID}, {status, businessID});
        }else{
            updatedUserStatus = await UserDetails.findOneAndUpdate({_id: userID}, {businessID});
        }
        if (!updatedUserStatus) {
            return res.status(404).json({ message: "User details not found" });
        }
        res.status(200).json({ message: "Status and businessID updated successfully", updatedUserStatus });
    } catch (error) {
        res.status(500).json({ message: "Failed to update status and businessID", error: error.message });
    }
}

const recycleItem = async (req, res) => {
    const { userID, businessID, status, fullName, phoneNumber, pickupAddress, eWasteType, verifyCaptcha } = req.body;
    console.log(verifyCaptcha)
    try {
        const newRecycleItem = await RecycleItem.create({
            userID,
            businessID,
            status,
            fullName,
            phoneNumber,
            pickupAddress,
            eWasteType,
            verifyCaptcha
        });
        console.log(newRecycleItem)
        res.status(201).json({ message: "Recycle item created successfully", newRecycleItem });
    } catch (error) {
        res.status(500).json({ message: "Failed to create recycle item", error: error.message });
    }
}

const getBusinessProfile = async (req, res) => {
    const businessID = new ObjectId(req.params.userID);

    try{
        const recycleDetails = await RecycleItem.aggregate([
            {
                $match: {
                    businessID: businessID
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userID",
                    foreignField: "_id",
                    as: "userInfo"
                }
            },
            {
                $unwind: "$userInfo"          
            },
            // {
            //     $lookup: {
            //         from: "users",              
            //         localField: "UserDetails.userID",      
            //         foreignField: "_id",       
            //         as: "userInfo"
            //     }
            // },
            // {
            //     $unwind: "$userInfo"          
            // },
            // {
            //     $project: {
            //         _id: 1,
            //         userID: 1,
            //         businessID: 1,
            //         status: 1,
            //         createdAt: 1,
            //         UserDetails: {
            //             $filter: {
            //                 input: "$UserDetails",
            //                 as: "user",
            //                 cond: { $eq: ["$$user.businessID", "$businessID"] }
            //             }
            //         }
            //     }
            // },
        ]);
        res.status(200).json({
            success: true,
            recycleDetails
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch all details!",
            error: error.message
        })
    }
}

export { completeBusinessProfile, getBusinessDetails, updateUserStatus, recycleItem, getBusinessProfile };