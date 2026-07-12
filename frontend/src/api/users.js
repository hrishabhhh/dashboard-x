import api from "./axios";

export async function getUsers() {
  const response = await api.get("/users");
  return response.data;
}

export async function deleteUser(_id) {
  const response = await api.delete(`/users/${_id}`);
  return response.data;
}

export async function createUser(userData) {
  const response = await api.post("/users", userData);
  return response.data.user || response.data;
}

export async function updateUser(_id, userData) {
  const response = await api.put(`/users/${_id}`, userData);
  return response.data.user || response.data;
}
