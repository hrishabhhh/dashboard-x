import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { createTask } from "../controllers/task.controller.js";

const router = express.Router();

router.post("/", verifyJWT, createTask);

export default router;
