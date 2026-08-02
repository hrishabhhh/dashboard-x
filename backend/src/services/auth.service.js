import { generateOtp } from "../../utils/otpGenerator";
import userAccount from "../models/account.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function registerUser(userData) {
  const { name, email, password } = userData;
  const SALT_ROUNDS = 10;
  const existingUser = await userAccount.findOne({
    email,
  });
  if (existingUser) {
    throw new AppError("User already exists", 400);
  } else {
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 5);
    const hashedpassword = await bcrypt.hash(password, SALT_ROUNDS);

    const otp = generateOtp();

    const newUser = await userAccount.create({
      name,
      email,
      password: hashedpassword,
      isVerified: false,
      otp: otp,
      otpExpiry: otpExpiry,
    });
    return newUser;
  }
}

export async function verifyUser(userData) {
  const { email, otp } = userData;
  const user = await userAccount.findOne({ email });
  if (!user) {
    throw new AppError("User not found", 404);
  }
  if (user.isVerified) {
    throw new AppError("User already verified", 400);
  }
  if (user.otp !== otp) {
    throw new AppError("Invalid OTP", 400);
  }
  if (new Date() > user.otpExpiry) {
    throw new AppError("OTP Expired", 400);
  }
  user.isVerified = true;
  user.otp = null;
  user.otpExpiry = null;

  await user.save();
  return user;
}

export async function loginUser(userData) {
  const { email, password } = userData;
  const user = await userAccount.findOne({ email });
  if (!user) {
    throw new AppError("User not found", 404);
  }
  if (!user.isVerified) {
    throw new AppError("User not verified", 400);
  }
  const isPassValid = await bcrypt.compare(password, user.password);
  if (!isPassValid) {
    throw new AppError("Invalid password", 400);
  }
  //generate JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  user.password = undefined;
  return { user, token };
}
