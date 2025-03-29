import UserDetails from "../models/UserDetails.js"

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
                    "userInfo.email": 1
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

export { RecycleWaste, getAllUsers };