import mongoose from "mongoose"
const Schema = mongoose.Schema

const userDetailSchema = new Schema({
    
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("User", userDetailSchema)