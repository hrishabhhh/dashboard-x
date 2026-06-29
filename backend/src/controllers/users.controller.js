import { fetchUsers } from "../services/users.service.js";

export async function getUsers(req, res) {
  try {
    const users = await fetchUsers();

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
