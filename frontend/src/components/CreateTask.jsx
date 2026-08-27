import { useEffect, useState } from "react";
import { getUsers } from "../api/users";
import { createTask } from "../api/tasks";

function CreateTask({ onTaskCreated, isOpen, isClose }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "medium",
    dueDate: "",
  });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadUsers() {
      try {
        const users = await getUsers();
        setUsers(users);
      } catch (error) {
        setError(error.message);
      }
    }
    loadUsers();
  }, []);
  if (!isOpen) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const data = await createTask(formData);

      console.log(data);
      setFormData({
        title: "",
        description: "",
        assignedTo: "",
        priority: "medium",
        dueDate: "",
      });
      onTaskCreated();
      //   isClose();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Task Creation Failed",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div
        onMouseDown={isClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      >
        <div
          className="w-full max-w-3xl mx-auto relative"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-red-100 bg-white p-6 shadow-lg"
          >
            {error && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Create New Task
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Assign a task to a registered Dashboard-X user.
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
                placeholder="e.g. Build analytics dashboard"
                value={formData.title}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
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
                placeholder="Describe what needs to be done..."
                value={formData.description}
                onChange={handleChange}
                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
            </div>

            <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="assignedTo"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Assigned To
                </label>

                <select
                  id="assignedTo"
                  name="assignedTo"
                  value={formData.assignedTo}
                  onChange={handleChange}
                  className="w-full cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                >
                  <option value="">Select User</option>

                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
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

            <div className="flex justify-end border-t border-gray-100 pt-5">
              <button
                type="submit"
                disabled={submitting}
                className="rounded-xl bg-green-500 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-green-700 focus:ring-2 focus:ring-red-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Creating Task..." : "Create Task"}
              </button>
            </div>
          </form>
          <button
            type="button"
            onClick={isClose}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-xl font-bold text-gray-500 transition hover:bg-red-50 hover:text-red-600"
            aria-label="Close create task modal"
          >
            ×
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateTask;
