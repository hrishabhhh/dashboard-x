import "./App.css";
import AppRouter from "./routes/AppRouter";
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <section
        id="center"
        className={
          theme === "dark"
            ? "bg-gray-900 text-white min-h-screen"
            : "bg-white text-black min-h-screen"
        }
      >
        <AppRouter />
      </section>
    </>
  );
}

export default App;
