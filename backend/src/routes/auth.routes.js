import express from "express";
import {
  register,
  verifyOtp,
  login,
  getProfile,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/register", register);

router.post("/verify-otp", verifyOtp);

router.post("/login", login);

router.get("/profile", verifyJWT, getProfile);

export default router;
