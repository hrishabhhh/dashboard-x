import {
  registerUser,
  verifyUser,
  loginUser,
} from "../services/auth.service.js";
export async function register(req, res) {
  try {
    const result = await registerUser(req.body);

    return res.status(201).json(result);
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
