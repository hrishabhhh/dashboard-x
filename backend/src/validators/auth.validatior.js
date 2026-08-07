import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name cannot exceed 50 characters"),

  email: z.email("Invalid email address").trim().toLowerCase(),

  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const verifyOtpSchema = z.object({
  email: z.email("Invalid email address").trim().toLowerCase(),

  otp: z.string().length(6, "OTP must be exactly 6 characters"),
});

export const loginSchema = z.object({
  email: z.email("Invalid email address").trim().toLowerCase(),

  password: z.string().min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  email: z.email("Invalid email address").trim().toLowerCase(),
});

export const resetPasswordSchema = z.object({
  email: z.email("Invalid email address").trim().toLowerCase(),

  otp: z.string().length(6, "OTP must be exactly 6 characters"),

  newPassword: z
    .string()
    .min(8, "New password must be at least 8 characters long"),
});
