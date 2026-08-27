import Task from "../models/task.model.js";
import User from "../models/user.model.js";
import { taskAssignedTemplate } from "../templates/taskAssignedTemplate.js";
import AppError from "../utils/AppError.js";
import sendMail from "../utils/email.js";

export async function createTaskService(TaskData, accountId) {
  const assigningUser = await User.findOne({
    account: accountId,
  });

  if (!assigningUser) {
    throw new AppError("Please register yourself before assigning tasks", 403);
  }

  const assignedUser = await User.findById(TaskData.assignedTo).populate(
    "account",
    "name email",
  );

  if (!assignedUser) {
    throw new AppError("Assigned User not found", 404);
  }

  const response = await Task.create({
    ...TaskData,
    assignedTo: assignedUser.id,
    assignedBy: assigningUser.id,
  });

  if (assignedUser.account.email) {
    try {
      const html = taskAssignedTemplate({
        assignedToName: assignedUser.name,
        assignedByName: assigningUser.name,
        title: response.title,
        description: response.description,
        priority: response.priority,
        dueDate: response.dueDate,
      });

      await sendMail({
        to: assignedUser.account.email,
        subject: `New task assigned: ${response.title}`,
        html,
      });
    } catch (error) {
      console.log("Task Created but email login failed", error);
    }
  } else {
    console.warn("Task created but assigned user has no linked account/email");
  }

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
