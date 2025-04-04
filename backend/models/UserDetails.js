import mongoose from "mongoose"
const Schema = mongoose.Schema

const userDetailSchema = new Schema({
    userID:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    businessID:{
        type: Schema.Types.ObjectId,
        ref: "Business",
    },
    fullName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    pickupAddress: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zipCode: {
        type: String,
        required: true,
    },
    preferredDate: {
        type: String,
        required: true,
    },
    preferredTime: {
        type: String
    },
    eWasteType: {
        type: [String],
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    specialHandling: {
        type: String,
        required: true
    },
    pickupDescription: {
        type: String,
        required: true
    },
    alternateContactNumber: {
        type: String
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected", "collected", "ready"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("UserDetails", userDetailSchema)