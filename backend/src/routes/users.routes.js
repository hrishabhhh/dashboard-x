import express from "express";
import {
  getUsers,
  deleteUser,
  createUser,
  putUser,
  patchUser,
} from "../controllers/users.controller.js";

import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getUsers);

router.post("/", verifyJWT, createUser);

router.put("/:id", putUser);

router.patch("/:id", patchUser);

router.delete("/:id", deleteUser);

export default router;
