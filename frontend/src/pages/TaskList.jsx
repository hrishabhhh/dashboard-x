import { useEffect } from "react";
import { useState } from "react";
import { deleteTask, getTasks } from "../api/tasks";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { getUsers } from "../api/users";
import { useAuth } from "../hooks/useAuth";
import EditTask from "../components/EditTask";

function TaskList({ refreshKey }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentRegisteredUser, setCurrentRegisteredUser] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const { user } = useAuth();

  async function loadTasks() {
    try {
      const data = await getTasks();
      const usersData = await getUsers();
      const matchedUser = usersData.find(
        (registeredUser) => String(registeredUser.account) === String(user?.id),
      );

      setCurrentRegisteredUser(matchedUser || null);
      setTasks(data.tasks);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!user) return;
    async function initialLoad() {
      await loadTasks();
    }
    initialLoad();
  }, [user, refreshKey]);

  async function handleDeleteTask(taskId) {
    try {
      await deleteTask(taskId);
      await loadTasks();
      return true;
    } catch (error) {
      setError(
        error.response.data.message || error.message || "Task deletion failed",
      );
    }
  }

  const cardColors = [
    "bg-blue-950 border-blue-800",
    "bg-purple-950 border-purple-800",
    "bg-indigo-950 border-indigo-800",
    "bg-cyan-950 border-cyan-800",
  ];

  if (loading) {
    return <Loader message="Loading Tasks" />;
  }

  if (error) {
    return <Error message={error} />;
  }
  return (
    <>
      <div className="w-full px-4 py-4">
        <div className="flex flex-col gap-4">
          {tasks.map((task, index) => {
            const cardColor = cardColors[index % cardColors.length];
            const canEdit =
              currentRegisteredUser &&
              String(task.assignedTo?._id) ===
                String(currentRegisteredUser?._id);

            const canDelete =
              currentRegisteredUser &&
              String(task.assignedBy?._id) ===
                String(currentRegisteredUser?._id);

            const priorityStyles = {
              low: "bg-green-500/15 text-green-300 border-green-500/30",
              medium: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
              high: "bg-red-500/15 text-red-300 border-red-500/30",
            };

            const statusStyles = {
              pending: "bg-gray-500/20 text-gray-300 border-gray-500/30",
              "in-progress": "bg-blue-500/15 text-blue-300 border-blue-500/30",
              completed: "bg-green-500/15 text-green-300 border-green-500/30",
            };

            return (
              <div
                key={task._id}
                className={`w-full overflow-hidden rounded-2xl border shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-xl ${cardColor}`}
              >
                {/* Dashboard-X Accent */}
                <div className="h-1.5 w-full bg-red-500" />

                <div className="px-5 py-4">
                  {/* Header */}
                  <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0">
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-red-400">
                        Dashboard-X Task
                      </p>

                      <h3 className="truncate text-xl font-bold text-white">
                        {task.title}
                      </h3>

                      <p className="mt-1 max-w-4xl truncate text-sm text-gray-400">
                        {task.description || "No description provided."}
                      </p>
                    </div>

                    {/* Priority + Status */}
                    <div className="flex flex-shrink-0 flex-wrap gap-2">
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${
                          priorityStyles[task.priority] ||
                          "border-gray-600 bg-gray-800 text-gray-300"
                        }`}
                      >
                        {task.priority || "N/A"} Priority
                      </span>

                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${
                          statusStyles[task.status] ||
                          "border-gray-600 bg-gray-800 text-gray-300"
                        }`}
                      >
                        {task.status?.replace("-", " ") || "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* Details + Actions Row */}
                  <div className="grid items-center gap-4 rounded-xl border border-white/10 bg-black/20 px-4 py-3 md:grid-cols-[1fr_1fr_1fr_auto]">
                    {/* Assigned To */}
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Assigned To
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-gray-200">
                        {task.assignedTo?.name || "N/A"}
                      </p>
                    </div>

                    {/* Assigned By */}
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Assigned By
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-gray-200">
                        {task.assignedBy?.name || "N/A"}
                      </p>
                    </div>

                    {/* Due Date */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Due Date
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-200">
                        {task.dueDate
                          ? new Date(task.dueDate).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : "N/A"}
                      </p>
                    </div>

                    {/* Actions */}
                    {(canEdit || canDelete) && (
                      <div className="flex items-end justify-end gap-2">
                        {canEdit && (
                          <button
                            type="button"
                            onClick={() => setSelectedTask(task)}
                            className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300 transition duration-200 hover:border-red-500 hover:bg-red-500/20"
                          >
                            Edit
                          </button>
                        )}

                        {canDelete && (
                          <button
                            type="button"
                            onClick={() => setDeleteTaskId(task._id)}
                            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-red-500 hover:shadow-md"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedTask && (
        <EditTask
          task={selectedTask}
          isOpen={!!selectedTask}
          isClose={() => setSelectedTask(null)}
          onTaskUpdated={loadTasks}
        />
      )}
      {deleteTaskId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-5">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-red-500">
                Dashboard-X
              </p>

              <h2 className="text-xl font-bold text-gray-900">Delete Task?</h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                This task will be permanently deleted. This action cannot be
                undone.
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTaskId(null)}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={async () => {
                  await handleDeleteTask(deleteTaskId);
                  setDeleteTaskId(null);
                }}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TaskList;
