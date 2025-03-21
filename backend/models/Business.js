import mongoose from "mongoose";
const Schema = mongoose.Schema;

const businessSchema = new Schema({
    role: {
        type: String,
        enum: ["user", "business"]
    },
    organizationName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
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
    verified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Business", businessSchema);