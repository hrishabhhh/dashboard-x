import express from "express";
import {
  getUsers,
  deleteUser,
  createUser,
  putUser,
  patchUser,
} from "../controllers/users.controller.js";

const router = express.Router();

router.get("/", getUsers);

router.post("/", createUser);

router.put("/:id", putUser);

router.patch("/:id", patchUser);

router.delete("/:id", deleteUser);

export default router;
