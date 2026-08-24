export function taskAssignedTemplate({
  assignedToName,
  assignedByName,
  title,
  description,
  priority,
  dueDate,
}) {
  return `
    <p>Hey ${assignedToName},</p>
    <p>${assignedByName} has assigned you a new task.</p>
    <p>Task: ${title}</p>
    <p>Priority: ${priority}</p>
    <p>Due date: ${dueDate}</p>
    <p>Description: ${description}</p>
    <hr>
    <p>Log in to Dashboard-X to view the task.</p>
    <p>DashboardX Team ❤️</p>
    `;
}
