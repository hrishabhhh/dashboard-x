import mongoose from "mongoose";
import { boolean, lowercase } from "zod";

const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    isVerified: {
        type: boolean,
        default: false,
    },
    otp: String,
    otpExpiry: Date,
    otpAttempts: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
}, );

const userAccount = mongoose.model("Account", accountSchema);

export default userAccount;