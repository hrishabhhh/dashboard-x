import { generateOtp } from "../../utils/otpGenerator";
import userAccount from "../models/account.model";
import bcrypt from "bcrypt";
export async function registerUser(userData) {
  //destructure data
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
