import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import CreateTask from "../components/CreateTask";
import { useState } from "react";
import Footer from "../components/Footer";

function MainLayout() {
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  function handleTaskCreated() {
    setRefreshKey((prev) => prev + 1);
    setIsCreateTaskOpen(false);
  }
  console.log("REFRESH KEY:", refreshKey);
  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <Navbar onCreateTask={() => setIsCreateTaskOpen(true)} />

      <main className="flex-1">
        <Outlet context={refreshKey} />
      </main>

      <CreateTask
        isOpen={isCreateTaskOpen}
        isClose={() => setIsCreateTaskOpen(false)}
        onTaskCreated={handleTaskCreated}
      />

      <Footer />
    </div>
  );
}

export default MainLayout;
