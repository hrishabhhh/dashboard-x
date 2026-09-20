import { useOutletContext } from "react-router-dom";
import HeroHome from "../components/HeroHome";
import TaskList from "./TaskList";
import { useAuth } from "../hooks/useAuth";
import RiskInsights from "../components/RiskInsights";

function Home() {
  const refreshKey = useOutletContext();
  const { isAuthenticated, user } = useAuth();

  return (
    <>
      <div className="my-2 mx-4 flex flex-col items-center align-center">
        <h1 className=" text-xl font-bold text-white-900 m-4 uppercase">
          {isAuthenticated || user ? "Tasks View" : ""}
        </h1>
        <div>
          <RiskInsights />
        </div>
        <TaskList refreshKey={refreshKey} />
      </div>

      <HeroHome />
    </>
  );
}

export default Home;
