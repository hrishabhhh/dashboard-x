import { createTaskService } from "../services/task.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validateTask } from "../validators/task.validator.js";

export const createTask = asyncHandler(async (req, res) => {
  const taskData = req.body;

  const validatedTask = validateTask(taskData);

  if (!validatedTask.isValid) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: validatedTask.errors,
    });
  }

  const createdTask = await createTaskService(taskData, req.user._id);
  if (!createdTask) {
    return res.status(400).json({
      success: false,
      message: "Task creation failed",
      task: null,
    });
  }
  return res.status(201).json({
    success: true,
    task: createdTask,
  });
});
