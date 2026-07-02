import api from "./axios";

export async function getUsers() {
  const response = await api.get("/users");

  return response.data;
}

export async function deleteUser(id) {
  const response = await api.delete(`/users/${id}`);
  return response.data;
}
