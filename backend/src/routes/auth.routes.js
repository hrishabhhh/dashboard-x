import express from "express";
import { register, verifyOtp, login } from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", register);

router.post("/verify-otp", verifyOtp);

router.post("/login", login);
