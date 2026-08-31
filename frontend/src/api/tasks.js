import api from "./axios";

export async function createTask(taskData) {
  const response = await api.post("/task", taskData);
  return response.data.task || response.data;
}

export async function getTasks() {
  const response = await api.get("/task");
  return response.data;
}

export async function updateTask(taskId, taskData) {
  const response = await api.patch(`/task/${taskId}`, taskData);
  return response.data.task || response.data;
}

export async function deleteTask(taskId) {
  const response = await api.delete(`/task/${taskId}`);
  return response.data;
}
