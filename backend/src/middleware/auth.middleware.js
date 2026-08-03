import jwt from "jsonwebtoken";
import userAccount from "../models/account.model.js";
import AppError from "../utils/AppError.js";
export async function verifyJWT(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Authorization header missing or invalid", 401);
    }
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userAccount.findById(decoded.id);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
