import Task from "../models/task.model.js";
import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";

export async function createTaskService(TaskData, accountId) {
  const assigningUser = await User.findOne({
    account: accountId,
  });

  if (!assigningUser) {
    throw new AppError("Please register yourself before assigning tasks", 403);
  }

  const assignedUser = await User.findById(TaskData.assignedTo);

  if (!assignedUser) {
    throw new AppError("Assigned User not found", 404);
  }

  const response = await Task.create({
    ...TaskData,
    assignedTo: assignedUser.id,
    assignedBy: assigningUser.id,
  });
  return response;
}

export async function getTasksService() {
  const tasks = await Task.find()
    .populate("assignedTo", "name email")
    .populate("assignedBy", "name email")
    .sort({ creatadAt: -1 });

  return tasks;
}

export async function patchTasksService(taskId, taskData, accountId) {
  const currentUser = await User.findOne({ account: accountId });
  if (!currentUser) {
    throw new AppError("You must be registered as user to update Task", 403);
  }

  const task = await Task.findById(taskId);
  if (!task) {
    throw new AppError("Task not found", 404);
  }

  if (task.assignedTo.toString() !== currentUser._id.toString()) {
    throw new AppError("You are not authorized to Edit this Task", 403);
  }

  const updatedTask = await Task.findByIdAndUpdate(taskId, taskData, {
    new: true,
    runValidators: true,
  });

  return updatedTask;
}
