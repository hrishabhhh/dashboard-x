import { useOutletContext } from "react-router-dom";
import TaskList from "./TaskList";

function Home() {
  const refreshKey = useOutletContext();

  return (
    <>
      <div className="my-2 mx-4 flex flex-col items-center align-center">
        <TaskList refreshKey={refreshKey} />
      </div>
    </>
  );
}

export default Home;
