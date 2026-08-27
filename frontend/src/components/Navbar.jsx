import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import NavLinking from "./Navlinking";
// import { useContext } from "react";
// import { ThemeContext } from "../context/ThemeContext";
function Navbar({ onCreateTask }) {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  return (
    <nav className="flex flex-row gap-10 p-6 bg-red-500 justify-between">
      <div className="flex flex-row items-center gap-2">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbTV4z1MwxZpohL8arJFNCIQrobK_LH55XXkOxA2y49g&s=10"
          className="w-5 h-5"
        />
        <h1 className="text-xl font-bold">DashBoard - X</h1>
      </div>
      <div className="flex flex-row gap-5 items-center">
        <NavLinking to="/" name="Home" />
        {isAuthenticated ? <NavLinking to="/users" name="Users" /> : ""}

        <button
          onClick={toggleTheme}
          className="bg-white text-black px-3 py-1 rounded"
        >
          {theme === "light" ? "🌞" : "🌙"}
        </button>

        {isAuthenticated && (
          <button
            type="button"
            onClick={onCreateTask}
            className="rounded-lg bg-white px-3 py-1 font-medium text-red-600 transition hover:bg-red-100"
          >
            + Create Task
          </button>
        )}

        {isAuthenticated ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <>
            <Link className="bg-white text-black px-3 py-1 rounded" to="/login">
              Login
            </Link>
            <Link
              className="bg-white text-black px-3 py-1 rounded"
              to="/register"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
