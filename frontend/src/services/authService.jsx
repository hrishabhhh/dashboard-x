import api from "../api/axios";

console.log(api);

export async function login(credentials) {
  // TODO
  console.log(credentials);
}

export async function logout() {
  // TODO
}

export async function getCurrentUser() {
  const response = await api.get("/auth/profile");
  return response.data.user;
}
