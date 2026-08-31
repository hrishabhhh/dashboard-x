import { useOutletContext } from "react-router-dom";
import HeroHome from "../components/HeroHome";
import TaskList from "./TaskList";

function Home() {
  const refreshKey = useOutletContext();
  return (
    <>
      <div className="my-2 mx-6 flex flex-col items-center align-center w-full">
        <h1 className="font-sans text-xl uppercase">Tasks View </h1>
        <TaskList refreshKey={refreshKey} />
      </div>

      <HeroHome />
    </>
  );
}

export default Home;
