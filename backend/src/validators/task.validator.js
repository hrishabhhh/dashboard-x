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

export function validatePatchTask(taskData) {
  const errors = [];

  const allowedFields = [
    "title",
    "description",
    "status",
    "priority",
    "dueDate",
  ];

  const allowedStatuses = ["pending", "in-progress", "completed"];

  const allowedPriorities = ["low", "medium", "high"];

  // Check whether client is trying to modify restricted fields
  const receivedFields = Object.keys(taskData);

  for (const field of receivedFields) {
    if (!allowedFields.includes(field)) {
      errors.push(`${field} cannot be modified`);
    }
  }

  if (taskData.title !== undefined) {
    if (typeof taskData.title !== "string" || !taskData.title.trim()) {
      errors.push("Title cannot be empty");
    }
  }

  if (taskData.description !== undefined) {
    if (typeof taskData.description !== "string") {
      errors.push("Description must be a string");
    }
  }

  if (taskData.status !== undefined) {
    if (!allowedStatuses.includes(taskData.status)) {
      errors.push("Status must be pending, in-progress or completed");
    }
  }

  if (taskData.priority !== undefined) {
    if (!allowedPriorities.includes(taskData.priority)) {
      errors.push("Priority must be low, medium or high");
    }
  }

  if (taskData.dueDate !== undefined) {
    const dueDate = new Date(taskData.dueDate);

    if (Number.isNaN(dueDate.getTime())) {
      errors.push("Please enter a valid due date");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
