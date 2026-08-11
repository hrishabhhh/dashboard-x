import api from "./axios";

export async function registerUser(userData) {
  const response = await api.post("/auth/register", userData);
  return response.data;
}

export async function verifyOtp(userData) {
  const response = await api.post("/auth/verify-otp", userData);
  return response.data;
}

export async function loginUser(userData) {
  const response = await api.post("/auth/login", userData);
  return response.data;
}
