import mongoose from "mongoose";
const Schema = mongoose.Schema;

const businessDetailSchema = new Schema({
    business:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    profileCompletion: {
        type: Boolean,
        default: false,
    },
    typeOfBusiness: {
        type: String,
        required: true,
    },
    businessRegistrationNumber: {
        type: String,
        required: true,
        unique: true,
    },
    gstNumber: {
        type: String,
        required: true,
        unique: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    fullAddress: {
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
    pinCode: {
        type: String,
        required: true,
    },
    websiteOrSocialMediaLinks: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Business", businessDetailSchema);