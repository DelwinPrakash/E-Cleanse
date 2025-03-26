import mongoose from "mongoose"
const Schema = mongoose.Schema

const user = new Schema({
    // auth_method: {
    //     type: String,
    //     enum: ["google", "email"]
    // },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password_hash: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "business"]
    },
    verified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String
    },
    profileCompletion: {
        type: Boolean,
        default: false,
    },
    // google_id: {
    //     type: String
    // },
    // profile: {
    //     name: {
    //         type: String
    //     },
    //     avatar: {
    //         type: String
    //     }
    // },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("User", user)