import { readUsers, writeUsers } from "../../utils/file.js";
// import api from "../config/axios.js";

function buildUser(id, userData) {
  return {
    id,
    ...userData,
    company: {
      name: userData.company,
    },
  };
}

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
  const response = buildUser(maxId + 1, userData);
  data.push(response);
  await writeUsers(data);
  return response;
}

export async function putUserService(id, userData) {
  const data = await readUsers();
  let ind = -1;
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == id) {
      ind = i;
      break;
    }
  }
  if (ind == -1) {
    return null;
  }
  const response = buildUser(data[ind].id, userData);
  data[ind] = response;
  await writeUsers(data);
  return response;
}

export async function patchUserService(id, userData) {
  const response = await api.patch(`/users/${id}`, userData);
  return response.data;
}

export async function deleteUserService(id) {
  const response = await api.delete(`/users/${id}`);
  return response.data;
}
