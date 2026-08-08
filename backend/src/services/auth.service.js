import { generateOtp } from "../utils/otpGenerator.js";
import userAccount from "../models/account.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import otpEmailTemplate from "../templates/otpEmailTemplate.js";
import forgotPasswordTemplate from "../templates/forgotPasswordTemplate.js";
import { sendMail } from "../utils/email.js";
import { sanitizedUser } from "../utils/sanitizeUser.js";
import { success } from "zod";
import resetPasswordTemplate from "../templates/resetPasswordTemplate.js";

export async function registerUser(userData) {
    const { name, email, password } = userData;
    const SALT_ROUNDS = 10;
    const existingUser = await userAccount.findOne({
        email,
    });
    if (existingUser) {
        throw new AppError("User already exists", 400);
    }
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 5);
    const hashedpassword = await bcrypt.hash(password, SALT_ROUNDS);

    const otp = generateOtp();

    const newUser = await userAccount.create({
        name,
        email,
        password: hashedpassword,
        isVerified: false,
        otp: otp,
        otpExpiry: otpExpiry,
    });

    const html = otpEmailTemplate(name, otp);
    await sendMail({
        to: email,
        subject: "Verify your email - Dashboard-X",
        html: html,
    });
    return {
        success: true,
        message: "Registration successful, Please verify your mail",
        user: sanitizedUser(newUser),
    };
    console.log("MAIL INFO:", info);
}

export async function verifyUser(userData) {
    const { email, otp } = userData;
    const user = await userAccount.findOne({ email });
    if (!user) {
        throw new AppError("User not found", 404);
    }
    if (user.isVerified) {
        throw new AppError("User already verified", 400);
    }
    if (user.otp !== otp) {
        throw new AppError("Invalid OTP", 400);
    }
    if (new Date() > user.otpExpiry) {
        throw new AppError("OTP Expired", 400);
    }
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();
    return {
        success: true,
        message: "Email verified successfully",
        user: sanitizedUser(user),
    };
}

export async function loginUser(userData) {
    const { email, password } = userData;
    const user = await userAccount.findOne({ email }).select("+password");
    if (!user) {
        throw new AppError("User not found", 404);
    }
    if (!user.isVerified) {
        throw new AppError("User not verified", 400);
    }
    const isPassValid = await bcrypt.compare(password, user.password);
    if (!isPassValid) {
        throw new AppError("Invalid password", 400);
    }
    //generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    // user.password = undefined;
    return {
        success: true,
        message: "Login Successful",
        user: sanitizedUser(user),
        token,
    };
}

export async function forgotPasswordService(userData) {
    const { email } = userData;

    const user = await userAccount.findOne({ email });

    if (user) {
        const otp = generateOtp();
        const otpExpiry = new Date();
        otpExpiry.setMinutes(otpExpiry.getMinutes() + 5);

        user.otp = otp;
        user.otpExpiry = otpExpiry;
        user.otpAttempts = 0;
        await user.save();

        const html = forgotPasswordTemplate(user.name, otp);
        await sendMail({
            to: user.email,
            subject: "Reset your password - Dashboard-X",
            html,
        });
    }
    return {
        success: true,
        message: "If an account exists, we've sent a password reset OTP.",
    };
}

export async function resetPasswordService(userData) {
    const { email, otp, newPassword } = userData;
    const SALT_ROUNDS = 10;
    const user = await userAccount.findOne({ email });
    if (!user) {
        throw new AppError("User not found", 404);
    }
    if (new Date() > user.otpExpiry) {
        user.otp = null;
        user.otpExpiry = null;
        user.otpAttempts = 0;
        await user.save();
        throw new AppError("OTP Expired", 400);
    }
    if (user.otp !== otp) {
        user.otpAttempts++;

        if (user.otpAttempts >= 3) {
            user.otp = null;
            user.otpExpiry = null;
            user.otpAttempts = 0;
            await user.save();

            throw new AppError("Maximum OTP attempts exceeded, Request new OTP", 400);
        }
        await user.save();
        throw new AppError("Invalid OTP", 400);
    }

    const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
    user.password = passwordHash;
    user.otp = null;
    user.otpExpiry = null;
    user.otpAttempts = 0;
    await user.save();
    const html = resetPasswordTemplate(user.name);
    await sendMail({
        to: user.email,
        subject: "Password Reset Successful - Dashboard-X",
        html,
    });
    return {
        success: true,
        message: "Password reset successful",
    };
}