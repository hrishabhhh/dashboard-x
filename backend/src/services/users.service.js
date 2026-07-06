import { readUsers, writeUsers } from "../../utils/file.js";
// import api from "../config/axios.js";

export async function fetchUsers() {
  const response = await readUsers();
  return response;
}

export async function createUserService(userData) {
  const data = await readUsers();
  let maxId = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].id > maxId) {
      maxId = data[i].id;
    }
  }
  const response = {
    id: maxId + 1,
    name: userData.name,
    username: userData.username,
    email: userData.email,
    phone: userData.phone,
    website: userData.website,
    company: {
      name: userData.company,
    },
  };
  data.push(response);
  await writeUsers(data);
  return response;
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
