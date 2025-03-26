import mongoose from "mongoose";
const Schema = mongoose.Schema;

const businessDetailSchema = new Schema({
    userID:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    businessName: {
        type: String,
        required: true,
    },
    businessType: {
        type: String,
        required: true,
    },
    businessRegNumber: {
        type: String,
        required: true,
        unique: true,
    },
    gstOrTaxNumber: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    address: {
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
    socialAccount: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Business", businessDetailSchema);