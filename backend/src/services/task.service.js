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
