import api from "../config/axios.js";

export async function fetchUsers() {
  const response = await api.get("/users");

  return response.data;
}
