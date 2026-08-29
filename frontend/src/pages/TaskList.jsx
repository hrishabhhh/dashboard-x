import { useEffect } from "react";
import { useState } from "react";
import { getTasks } from "../api/tasks";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { getUsers } from "../api/users";
import { useAuth } from "../hooks/useAuth";
import CreateTask from "../components/CreateTask";
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
        (registeredUser) =>
          String(registeredUser.account) === String(user?._id),
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
  console.log("TASKLIST REFRESH KEY:", refreshKey);
  if (loading) {
    return <Loader message="Loading Tasks" />;
  }

  if (error) {
    return <Error message={error} />;
  }
  return (
    <>
      <div className="m-6">{<CreateTask onTaskCreated={loadTasks} />}</div>

      <div className="flex flex-col gap-5">
        {tasks.map((task) => {
          const canEdit =
            currentRegisteredUser &&
            String(task.assignedTo?._id) === String(currentRegisteredUser?._id);
          return (
            <div
              key={task._id}
              className="rounded-2xl border border-gray-300 bg-white p-5 text-black shadow"
            >
              <h3 className="mb-2 text-xl font-bold">{task.title}</h3>

              <p className="mb-4">{task.description}</p>

              <p>
                <strong>Assigned To:</strong> {task.assignedTo?.name || "N/A"}
              </p>

              <p>
                <strong>Assigned By:</strong> {task.assignedBy?.name || "N/A"}
              </p>

              <p>
                <strong>Status:</strong> {task.status || "N/A"}
              </p>

              <p>
                <strong>Priority:</strong> {task.priority || "N/A"}
              </p>

              <p>
                <strong>Due Date:</strong>{" "}
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString("en-IN")
                  : "N/A"}
              </p>
              {canEdit && (
                <button
                  onClick={() => setSelectedTask(task)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-300 mt-2"
                >
                  Edit Task
                </button>
              )}
            </div>
          );
        })}
      </div>
      <div>
        {selectedTask && (
          <EditTask
            // key={selectedTask._id}
            task={selectedTask}
            isOpen={!!selectedTask}
            isClose={() => setSelectedTask(null)}
            onTaskUpdated={loadTasks}
          />
        )}
      </div>
    </>
  );
}

export default TaskList;
