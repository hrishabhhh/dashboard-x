import { useOutletContext } from "react-router-dom";
import HeroHome from "../components/HeroHome";
import TaskList from "./TaskList";

function Home() {
  const refreshKey = useOutletContext();
  return (
    <>
      <div className="m-6 flex flex-col gap-5 items-center align-center">
        <h1 className="font-sans text-xl uppercase">Tasks View </h1>
        <TaskList refreshKey={refreshKey} />
      </div>

      <HeroHome />
    </>
  );
}

export default Home;
