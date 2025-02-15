import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"], 
        trim: true, 
        minLength: [3, "Name must be at least 3 characters"], 
        maxLength: [50, "Name must be at most 50 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        minLength: [5, "Email must be at least 5 characters"],
        maxLength: [255, "Email must be at most 255 characters"],
        lowercase: true,
        match:  [/^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Email is invalid"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
        minLength: [6, "Password must be at least 6 characters"],
        maxLength: [20, "Password must be at most 1024 characters"]
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;