import { useState } from "react";
import { updateTask } from "../api/tasks";

function EditTask({ task, isOpen, isClose, onTaskUpdated }) {
  const [formData, setFormData] = useState({
    title: task.title || "",
    description: task.description || "",
    status: task.status || "pending",
    priority: task.priority || "medium",
    dueDate: task.dueDate
      ? new Date(task.dueDate).toISOString().split("T")[0]
      : "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  console.log(loading, error);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!task?._id) return;

    setError("");
    setLoading(true);

    try {
      await updateTask(task._id, formData);
      onTaskUpdated();
      isClose();
    } catch (error) {
      setError(
        error.response.data.message || error.message || "Task Update Failed",
      );
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen || !task) return null;

  return (
    <>
      return (
      <div
        onMouseDown={isClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      >
        <div
          onMouseDown={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl"
        >
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-red-100 bg-white p-6 shadow-xl"
          >
            {error && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Edit Task</h2>

              <p className="mt-1 text-sm text-gray-500">
                Update the task details and save your changes.
              </p>
            </div>

            <div className="mb-5">
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Task Title
              </label>

              <input
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Task title"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Task description"
                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-gray-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
            </div>

            <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="status"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Status
                </label>

                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="priority"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Priority
                </label>

                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="mb-7">
              <label
                htmlFor="dueDate"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Due Date
              </label>

              <input
                id="dueDate"
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
              <button
                type="button"
                onClick={isClose}
                disabled={loading}
                className="rounded-xl border border-gray-200 px-5 py-3 font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-red-500 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Updating Task..." : "Save Changes"}
              </button>
            </div>
          </form>

          <button
            type="button"
            onClick={isClose}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-xl font-bold text-gray-500 transition hover:bg-red-50 hover:text-red-600"
            aria-label="Close edit task modal"
          >
            ×
          </button>
        </div>
      </div>
      );
    </>
  );
}

export default EditTask;
