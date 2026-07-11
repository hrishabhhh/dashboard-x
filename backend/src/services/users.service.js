import { readUsers, writeUsers } from "../../utils/file.js";
import User from "../models/user.model.js";
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
  const response = await User.find();
  return response;
}

export async function createUserService(userData) {
  // const data = await readUsers();
  // let maxId = 0;
  // for (let i = 0; i < data.length; i++) {
  //   if (data[i].id > maxId) {
  //     maxId = data[i].id;
  //   }
  // }
  // const response = buildUser(maxId + 1, userData);
  // data.push(response);
  // await writeUsers(data);
  // return response;

  const response = await User.create(userData);
  return response;
}

export async function putUserService(id, userData) {
  // const data = await readUsers();
  // let ind = -1;
  // for (let i = 0; i < data.length; i++) {
  //   if (data[i].id == id) {
  //     ind = i;
  //     break;
  //   }
  // }
  // if (ind == -1) {
  //   throw new AppError("User not found", 404);
  // }
  // const response = buildUser(data[ind].id, userData);
  // data[ind] = response;
  // await writeUsers(data);
  // return response;
  const response = await User.findByIdAndUpdate(id, userData, { new: true });
  if (!response) {
    throw new AppError("User not found", 404);
  }
  return response;
}

export async function patchUserService(id, userData) {
  // const data = await readUsers();
  // let ind = -1;
  // for (let i = 0; i < data.length; i++) {
  //   if (data[i].id == id) {
  //     ind = i;
  //     break;
  //   }
  // }
  // if (ind == -1) {
  //   throw new AppError("User not found", 404);
  // }
  // // debugger;
  // const oldUser = data[ind];
  // // console.log("olduser-----", oldUser);
  // const response = {
  //   ...oldUser,
  //   ...userData,
  //   company: userData.company ? { name: userData.company } : oldUser.company,
  // };
  // data[ind] = response;
  // await writeUsers(data);
  // return response;
  const response = await User.findByIdAndUpdate(id, userData, { new: true });
  if (!response) {
    throw new AppError("User not found", 404);
  }
  return response;
}

export async function deleteUserService(id) {
  // const data = await readUsers();
  // let ind = -1;
  // for (let i = 0; i < data.length; i++) {
  //   if (data[i].id == id) {
  //     ind = i;
  //     break;
  //   }
  // }
  // if (ind == -1) {
  //   throw new AppError("User not found", 404);
  // }
  // let deletedResponse = data.splice(ind, 1);
  // await writeUsers(data);
  // return deletedResponse[0];

  const response = await User.findByIdAndDelete(id);
  if (!response) {
    throw new AppError("User not found", 404);
  }
  return response;
}
