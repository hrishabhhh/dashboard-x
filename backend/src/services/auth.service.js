import userAccount from "../models/account.model";
import bcrypt from "bcrypt";
export async function registerUser(userData) {
  //destructure data
  const { name, email, password } = userData;
  const SALT_ROUNDS = 10;
  const isVerified = false;
  const emailResponse = await userAccount.findOne({
    email,
  });
  if (emailResponse) {
    throw new AppError("User already exists", 400);
  } else {
    const hashed_password = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await userAccount.create({
      name,
      email,
      isVerified: true,
    });
    return newUser;
  }
}
