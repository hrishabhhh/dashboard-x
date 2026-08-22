export function validateTask(taskData) {
  const errors = [];

  const allowedPriorities = ["low", "medium", "high"];

  if (!taskData.title || !taskData.title.trim()) {
    errors.push("Title is required");
  }

  if (
    taskData.description !== undefined &&
    typeof taskData.description !== "string"
  ) {
    errors.push("Description must be a string");
  }

  if (!taskData.assignedTo) {
    errors.push("Assigned user is required");
  }

  if (!taskData.dueDate) {
    errors.push("Due date is required");
  } else {
    const dueDate = new Date(taskData.dueDate);

    if (Number.isNaN(dueDate.getTime())) {
      errors.push("Please enter a valid due date");
    }
  }

  if (
    taskData.priority !== undefined &&
    !allowedPriorities.includes(taskData.priority)
  ) {
    errors.push("Priority must be low, medium or high");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
