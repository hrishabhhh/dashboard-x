import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import CreateTask from "../components/CreateTask";
import { useState } from "react";

function MainLayout() {
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  function handleTaskCreated() {
    setRefreshKey((prev) => prev + 1);
    setIsCreateTaskOpen(false);
  }
  console.log("REFRESH KEY:", refreshKey);
  return (
    <>
      <Navbar onCreateTask={() => setIsCreateTaskOpen(true)} />

      <Outlet context={refreshKey} />

      <CreateTask
        isOpen={isCreateTaskOpen}
        isClose={() => setIsCreateTaskOpen(false)}
        onTaskCreated={handleTaskCreated}
      />
    </>
  );
}

export default MainLayout;
