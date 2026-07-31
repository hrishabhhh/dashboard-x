import mongoose, { Schema } from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    name: {
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
    isVerified: Boolean,
    otp: String,
    otpExpiry: Date,
  },
  {
    timestamps: true,
  },
);

const userAccount = mongoose.model("Account", accountSchema);

export default userAccount;
