import express from "express";
import {
  register,
  verifyOtp,
  login,
  getProfile,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.js";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verifyOtpSchema,
} from "../validators/auth.validatior.js";
const router = express.Router();

router.post("/register", validate(registerSchema), register);

router.post("/verify-otp", validate(verifyOtpSchema), verifyOtp);

router.post("/login", validate(loginSchema), login);

router.get("/profile", verifyJWT, getProfile);

router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);

router.post("/reset-password", validate(resetPasswordSchema), resetPassword);

export default router;
