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
    const { status } = req.body;
    try {
        const updatedUserStatus = await UserDetails.findOneAndUpdate({_id: userID}, {status});
        if (!updatedUserStatus) {
            return res.status(404).json({ message: "User details not found" });
        }
        res.status(200).json({ message: "Status updated successfully", updatedUserStatus });
    } catch (error) {
        res.status(500).json({ message: "Failed to update status", error: error.message });
    }
}

const recycleItem = async (req, res) => {
    const { userID, businessID, status } = req.body;
    try {
        const newRecycleItem = await RecycleItem.create({
            userID,
            businessID,
            status
        });
        res.status(201).json({ message: "Recycle item created successfully", newRecycleItem });
    } catch (error) {
        res.status(500).json({ message: "Failed to create recycle item", error: error.message });
    }
}

const getBusinessProfile = async (req, res) => {
    const businessID = new ObjectId(req.params.userID);

    try{
        
        // if(!recycleDetails){
            //     return res.status(404).json({message: "Recycle details not found!"});
            // }
            
        // const businessDetails = await BusinessDetails.findOne({ userID: businessID }).exec();
        // const recycleDetails = await RecycleItem.find({ businessID }).exec();
        // if(recycleDetails){
        //     userDetails = await UserDetails.findOne({ _id: recycleDetails[0].userID }).exec();
        // }
        
        // res.status(200).json({
        //     success: true,
        //     recycleDetails: recycleDetails || null,
        //     businessDetails,
        //     userDetails
        // });
        
        const recycleDetails = await RecycleItem.aggregate([
            
            {
                $lookup: {
                    from: "userdetails",
                    localField: "userID",
                    foreignField: "userID",
                    as: "userDetails"
                }
            },
            {
                $unwind: "$userDetails"          
            },
            {
                $lookup: {
                    from: "users",              
                    localField: "userDetails.userID",
                    foreignField: "_id",       
                    as: "userInfo"
                }
            },
            {
                $unwind: "$userInfo"          
            },
            {
                $match: {
                    businessID: businessID
                }
            },
            {
                $project: {
                    _id: 1,
                    userID: 1,
                    businessID: 1,
                    status: 1,
                    "userDetails.fullName": 1,
                    "userDetails.eWasteType": 1,
                    "userDetails.phoneNumber": 1,
                    "userDetails.pickupAddress": 1,
                    "userDetails._id": 1,
                    "userInfo.email": 1
                }
            },
            {
                $group: {
                    _id: "$userDetails._id",
                    userID: { $first: "$userID" },
                    businessID: { $first: "$businessID" },
                    status: { $first: "$status" },
                    fullName: { $first: "$userDetails.fullName" },
                    phoneNumber: { $first: "$userDetails.phoneNumber" },
                    pickupAddress: { $first: "$userDetails.pickupAddress" },
                    eWasteType: { $addToSet: "$userDetails.eWasteType" }, // Collect unique eWasteTypes
                    email: { $first: "$userInfo.email" }
                }
            },
            {
                $project: {
                    _id: 1,
                    userID: 1,
                    businessID: 1,
                    status: 1,
                    fullName: 1,
                    phoneNumber: 1,
                    pickupAddress: 1,
                    eWasteType: { $reduce: {
                        input: "$eWasteType",
                        initialValue: [],
                        in: { $setUnion: ["$$value", "$$this"] }
                    }},
                    email: 1
                }
            }
        ]);
        
        if(recycleDetails.length === 0){
            return res.status(404).json({
                success: false,
                message: "No recycle details found for the specified business!",
                recycleDetails: null
            });
        }
        
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