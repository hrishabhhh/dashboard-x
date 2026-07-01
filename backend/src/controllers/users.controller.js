import {
  fetchUsers,
  deleteUserService,
  createUserService,
  putUserService,
  patchUserService,
} from "../services/users.service.js";

export async function getUsers(req, res) {
  try {
    const users = await fetchUsers();
    res.json(users);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    await deleteUserService(id);
    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function createUser(req, res) {
  try {
    const userData = req.body;
    const createdUser = await createUserService(userData);
    if (!createdUser) {
      return res.status(400).json({
        success: false,
        message: "User creation failed",
        user: null,
      });
    }
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: createdUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      user: null,
    });
  }
}

export async function putUser(req, res) {
  try {
    const { id } = req.params;
    const userData = req.body;
    const updatedUser = await putUserService(id, userData);
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User replaced successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function patchUser(req, res) {
  try {
    const { id } = req.params;
    const userData = req.body;
    const patchedUser = await patchUserService(id, userData);

    if (!patchedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User Data has been modified successfully",
      user: patchedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
