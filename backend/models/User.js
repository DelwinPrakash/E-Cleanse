import mongoose from "mongoose"
const Schema = mongoose.Schema

const user = new Schema({
    auth_method: {
        type: String,
        enum: ["google", "email"]
    },
    email: {
        type: String,
        required: true
    },
    password_hash: {
        type: String,
    },
    google_id: {
        type: String
    },
    profile: {
        name: {
            type: String
        },
        avatar: {
            type: String
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("User", user)