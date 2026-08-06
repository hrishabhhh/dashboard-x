import {
  registerUser,
  verifyUser,
  loginUser,
  forgotPasswordService,
  resetPasswordService,
} from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const register = asyncHandler(async (req, res) => {
  const result = await registerUser(req.body);
  return res.status(201).json({
    success: true,
    message:
      "Registration successful. Please check your email for the verification OTP.",
    user: result,
  });
});

export const verifyOtp = asyncHandler(async (req, res) => {
  const response = await verifyUser(req.body);
  return res.status(200).json(response);
});

export const login = asyncHandler(async (req, res) => {
  const response = await loginUser(req.body);
  return res.status(200).json(response);
});

export const getProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const response = await forgotPasswordService(req.body);
  res.status(200).json(response);
});

export const resetPassword = asyncHandler(async (req, res) => {
  const response = await resetPasswordService(req.body);
  res.status(200).json(response);
});
