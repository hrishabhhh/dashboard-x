import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  phone: String,
  website: String,
  company: String,
});

const User = mongoose.model("User", userSchema);

export default User;
