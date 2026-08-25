import { useEffect } from "react";
import { useState } from "react";
import { getTasks } from "../api/tasks";
import Loader from "../components/Loader";
import Error from "../components/Error";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks();
        setTasks(data.tasks);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    loadTasks();
  }, []);
  if (loading) {
    return <Loader message="Loading Tasks" />;
  }

  if (error) {
    return <Error message={error} />;
  }
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {tasks.map((task) => (
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
        </div>
      ))}
    </div>
  );
}

export default TaskList;
