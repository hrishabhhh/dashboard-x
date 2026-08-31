import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  createTask,
  deleteTask,
  getTasks,
  patchTask,
} from "../controllers/task.controller.js";

const router = express.Router();

router.get("/", verifyJWT, getTasks);

router.post("/", verifyJWT, createTask);

router.patch("/:id", verifyJWT, patchTask);

router.delete("/:id", verifyJWT, deleteTask);

export default router;
