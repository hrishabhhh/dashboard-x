import { useOutletContext } from "react-router-dom";
import HeroHome from "../components/HeroHome";
import TaskList from "./TaskList";

function Home() {
  const refreshKey = useOutletContext();
  return (
    <>
      <div className="my-2 mx-4 flex flex-col items-center align-center">
        <h1 className=" text-xl font-bold text-white-900 m-4 uppercase">
          Tasks View{" "}
        </h1>
        <TaskList refreshKey={refreshKey} />
      </div>

      <HeroHome />
    </>
  );
}

export default Home;
