import api from "../config/axios.js";

export async function fetchUsers() {
  const response = await api.get("/users");
  return response.data;
}

export async function createUserService(userData) {
  const response = await api.post("/users", userData);
  return response.data;
}

export async function putUserService(id, userData) {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
}

export async function patchUserService(id, userData) {
  const response = await api.patch(`/users/${id}`, userData);
  return response.data;
}

export async function deleteUserService(id) {
  const response = await api.delete(`/users/${id}`);
  return response.data;
}
