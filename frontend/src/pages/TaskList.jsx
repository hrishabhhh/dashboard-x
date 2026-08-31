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
    } catch (error) {
      setError(
        error.response.data.message || error.message || "Task deletion failed",
      );
    }
  }

  if (loading) {
    return <Loader message="Loading Tasks" />;
  }

  if (error) {
    return <Error message={error} />;
  }
  return (
    <>
      <>
        <div className="w-full px-4 py-4">
          <div className="flex flex-col gap-4">
            {tasks.map((task) => {
              const canEdit =
                currentRegisteredUser &&
                String(task.assignedTo?._id) ===
                  String(currentRegisteredUser?._id);

              const canDelete =
                currentRegisteredUser &&
                String(task.assignedBy?._id) ===
                  String(currentRegisteredUser?._id);

              const priorityStyles = {
                low: "bg-green-50 text-green-700 border-green-200",
                medium: "bg-yellow-50 text-yellow-700 border-yellow-200",
                high: "bg-red-50 text-red-700 border-red-200",
              };

              const statusStyles = {
                pending: "bg-gray-100 text-gray-700 border-gray-200",
                "in-progress": "bg-blue-50 text-blue-700 border-blue-200",
                completed: "bg-green-50 text-green-700 border-green-200",
              };

              return (
                <div
                  key={task._id}
                  className="w-full overflow-hidden rounded-2xl border border-red-100 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="h-1.5 w-full bg-red-500" />

                  <div className="px-5 py-4">
                    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div className="min-w-0">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-red-500">
                          Dashboard-X Task
                        </p>

                        <h3 className="truncate text-xl font-bold text-gray-900">
                          {task.title}
                        </h3>

                        <p className="mt-1 max-w-4xl truncate text-sm text-gray-500">
                          {task.description || "No description provided."}
                        </p>
                      </div>

                      {/* Priority + Status */}
                      <div className="flex flex-shrink-0 flex-wrap gap-2">
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${
                            priorityStyles[task.priority] ||
                            "border-gray-200 bg-gray-50 text-gray-700"
                          }`}
                        >
                          {task.priority || "N/A"} Priority
                        </span>

                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${
                            statusStyles[task.status] ||
                            "border-gray-200 bg-gray-50 text-gray-700"
                          }`}
                        >
                          {task.status?.replace("-", " ") || "N/A"}
                        </span>
                      </div>
                    </div>

                    {/* Details + Actions Row */}
                    <div className="grid items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 md:grid-cols-[1fr_1fr_1fr_auto]">
                      {/* Assigned To */}
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                          Assigned To
                        </p>

                        <p className="mt-1 truncate text-sm font-semibold text-gray-800">
                          {task.assignedTo?.name || "N/A"}
                        </p>
                      </div>

                      {/* Assigned By */}
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                          Assigned By
                        </p>

                        <p className="mt-1 truncate text-sm font-semibold text-gray-800">
                          {task.assignedBy?.name || "N/A"}
                        </p>
                      </div>

                      {/* Due Date */}
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                          Due Date
                        </p>

                        <p className="mt-1 text-sm font-semibold text-gray-800">
                          {task.dueDate
                            ? new Date(task.dueDate).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                },
                              )
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
                              className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition duration-200 hover:border-red-500 hover:bg-red-50"
                            >
                              Edit
                            </button>
                          )}

                          {canDelete && (
                            <button
                              type="button"
                              onClick={() => handleDeleteTask(task._id)}
                              className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-red-600 hover:shadow-md"
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
      </>
    </>
  );
}

export default TaskList;
