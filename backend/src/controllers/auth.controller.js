import {
  registerUser,
  verifyUser,
  loginUser,
  forgotPasswordService,
  resetPasswordService,
} from "../services/auth.service.js";
import sendMail from "../utils/email.js";

export async function register(req, res) {
  try {
    const result = await registerUser(req.body);

    return res.status(201).json({
      success: true,
      message:
        "Registration successful. Please check your email for the verification OTP.",
      user: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

export async function verifyOtp(req, res) {
  try {
    const response = await verifyUser(req.body);
    return res.status(201).json(response);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

export async function login(req, res) {
  try {
    const response = await loginUser(req.body);
    return res.status(200).json(response);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getProfile(req, res) {
  res.status(200).json({
    success: true,
    user: req.user,
  });
}

export async function forgotPassword(req, res) {
  try {
    const response = await forgotPasswordService(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

export async function resetPassword(req, res) {
  try {
    const response = await resetPasswordService(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
