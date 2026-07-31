import express from "express";
import { register, verifyOtp } from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", register);

router.post("/verify-otp", verifyOtp);
