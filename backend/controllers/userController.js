import mongoose from "mongoose";
import RecycleItem from "../models/RecycleItem.js";
import UserDetails from "../models/UserDetails.js"
import RecentRecycle from "../models/RecentRecycle.js";

const { ObjectId } = mongoose.Types;

const RecycleWaste = async (req, res) => {
    const { formData, userID } = req.body;
    const{ fullName, phoneNumber, pickupAddress, street, city, state, zipCode, preferredDate, preferredTime, eWasteType, quantity, condition, specialHandling, pickupDescription, alternateContactNumber } = formData;

    try{
        const recycleWaste = await UserDetails.create({
            userID,
            fullName,
            phoneNumber,
            pickupAddress,
            street,
            city,
            state,
            zipCode,
            preferredDate,
            preferredTime,
            eWasteType,
            quantity,
            condition,
            specialHandling,
            pickupDescription,
            alternateContactNumber,
            status: "pending"
        });
        
        res.status(201).json({
            message: 'New Recycle item saved successfully',
            recycleWaste
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save recycle item', details: error.message });
    }
}

const getAllUsers = async (req, res) => {
    try{
        // const userDetails = await UserDetails.find();

        // if(!userDetails){
        //     return res.status(404).json({message: "No users found!"});
        // }
        
        const userDetails = await UserDetails.aggregate([
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
            {
                $project: {
                    _id: 1,
                    userID: 1,
                    fullName: 1,
                    phoneNumber: 1,
                    pickupAddress: 1,
                    street: 1,
                    city: 1,
                    state: 1,
                    zipCode: 1,
                    preferredDate: 1,
                    preferredTime: 1,
                    eWasteType: 1,
                    quantity: 1,
                    condition: 1,
                    specialHandling: 1,
                    pickupDescription: 1,
                    alternateContactNumber: 1,
                    status: 1,
                    "userInfo.email": 1,
                    "userInfo._id": 1,
                }
            }
        ]);

        if (!userDetails || userDetails.length === 0) {
            return res.status(404).json({ message: "No users found!" });
        }
        res.status(200).json({
            success: true,
            userDetails
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

const getUserProfile = async (req, res) => {
    const userID = new ObjectId(req.params.userID);

    try{
        // const userDetails = await UserDetails.findById(userID);

        // if(!userDetails){
        //     return res.status(404).json({message: "User not found!"});
        // }

        let recycleDetails = await RecycleItem.aggregate([
            // {
            //     $lookup: {
            //         from: "userdetails",
            //         localField: "userID",
            //         foreignField: "userID",
            //         as: "userDetails"
            //     }
            // },
            // {
            //     $unwind: "$userDetails"
            // },
            {
                $match: {
                    userID: userID
                }
            },
            {
                $lookup: {
                    from: "businesses",
                    localField: "businessID",
                    foreignField: "userID",
                    as: "businessDetails"
                }
            },
            {
                $unwind: "$businessDetails"
            },
            {
                $lookup: {
                    from: "users",
                    localField: "businessDetails.userID",
                    foreignField: "_id",
                    as: "businessInfo"
                }
            },
            {
                $unwind: "$businessInfo"          
            },
            // {
            //     $lookup: {
            //         from: "users",
            //         localField: "userDetails.userID",
            //         foreignField: "_id",
            //         as: "userInfo"
            //     }
            // },
            // {
            //     $match: {
            //         userID: userID
            //     }
            // },
            // {
            //     $project: {
            //         _id: 1,
            //         userID: 1,
            //         businessID: 1,
            //         status: 1,
            //         "userDetails.eWasteType": 1,
            //         "userDetails.status": 1,
            //         "businessDetails.businessName": 1,
            //         "businessDetails.phoneNumber": 1,
            //         "businessInfo.email": 1,
            //         "userDetails._id": 1,

            //     }
            // },
            // {
            //     $group: {
            //         _id: "$userDetails._id",
            //         userID: { $first: "$userID" },
            //         businessID: { $first: "$businessID" },
            //         status: { $first: "$status" },
            //         eWasteType: { $addToSet: "$userDetails.eWasteType" }, // Collect unique eWasteTypes
            //         userStatus: { $first: "$userDetails.status" },
            //         businessName: { $first: "$businessDetails.businessName" },
            //         phoneNumber: { $first: "$businessDetails.phoneNumber" },
            //         businessEmail: { $first: "$businessInfo.email" },
            //     }
            // },
            // {
            //     $project: {
            //         _id: 1,
            //         userID: 1,
            //         businessID: 1,
            //         status: 1,
            //         userStatus: 1,
            //         businessName: 1,
            //         phoneNumber: 1,
            //         businessEmail: 1,
            //         eWasteType: { $reduce: {
            //             input: "$eWasteType",
            //             initialValue: [],
            //             in: { $setUnion: ["$$value", "$$this"] }
            //         }},
            //     }
            // }
        ]);
        
        if(recycleDetails.length === 0){
            try{
                recycleDetails = await UserDetails.find({ userID: req.params.userID , status: "pending" });
            }catch(error){
                console.log(error);
                return res.status(404).json({message: "No pending items found!"});
            }
        }

        res.status(200).json({
            success: true,
            recycleDetails
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

const getUserRecycleHistory = async (req, res) => {
    const userID = new ObjectId(req.params.userID);
    try{
        const recentOrders = await RecentRecycle.aggregate([
            {
                $match: {
                    userID: userID,
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
        ]);
        console.log(recentOrders);
        res.status(200).json({
            success: true,
            recentOrders
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

// const getUserPendingItems = async (req, res) => {
//     const userID = req.params.userID;

//     try{
//         const pendingItems = await UserDetails.find({ userID, status: "pending" });

//         if(!pendingItems || pendingItems.length === 0){
//             return res.status(404).json({message: "No pending items found!"});
//         }

//         res.status(200).json({
//             success: true,
//             pendingItems
//         });
//     }catch(error){
//         console.log(error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to fetch pending items!",
//             error: error.message
//         })
//     }
// }

export { RecycleWaste, getAllUsers, getUserProfile, getUserRecycleHistory};