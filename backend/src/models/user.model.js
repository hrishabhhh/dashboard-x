import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    unique: true,
    sparse: true,
  },

  name: String,
  username: String,
  email: String,
  phone: String,
  website: String,
  company: String,
});

const User = mongoose.model("User", userSchema);

export default User;
