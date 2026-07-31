import { registerUser } from "../services/auth.service";

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

export async function verifyUserOtp(req, res) {
  try {
    const response = await verifyOtp(req.body);
    return res.status(201).json(response);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
