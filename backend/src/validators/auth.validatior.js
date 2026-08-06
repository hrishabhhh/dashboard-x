import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name cannot exceed 50 characters"),

  email: z.email("Invalid Email Address").trim().toLowerCase(),

  password: z.string().min(8, "Password must br 8 characters long"),
});
