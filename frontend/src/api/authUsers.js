import api from "./axios";

export async function registerUser(userData) {
  const response = await api.post("/auth/register", userData);
  return response.data;
}
