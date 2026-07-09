import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  fetchUsers,
  deleteUserService,
  createUserService,
  putUserService,
  patchUserService,
} from "../services/users.service.js";
import {
  validateUser,
  validatePatchUser,
} from "../validators/user.validator.js";

export async function getUsers(req, res, next) {
  try {
    const users = await fetchUsers();
    res.json(users);
  } catch (error) {
    console.error("GET USERS ERROR:");
    console.error(error);

    next(error);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;
    await deleteUserService(id);
    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

export const createUser = asyncHandler(async (req, res) => {
  const userData = req.body;
  // console.log("Userdata - - - - -", userData);
  const validatedData = validateUser(userData);

  if (!validatedData.isValid) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: validatedData.errors,
    });
  }
  // console.log("errors data - - - ", validatedData);
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
    user: createdUser,
  });
});

export async function putUser(req, res, next) {
  try {
    const { id } = req.params;
    const userData = req.body;

    const validatedData = validateUser(userData);

    if (!validatedData.isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validatedData.errors,
      });
    }
    console.log("val data-----", validatedData);
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
    next(error);
  }
}

export async function patchUser(req, res, next) {
  try {
    const { id } = req.params;
    const userData = req.body;
    const validatedUser = validatePatchUser(userData);

    if (!validatedUser.isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validatedUser.errors,
      });
    }

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
    next(error);
  }
}
