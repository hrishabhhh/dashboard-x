import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import NavLinking from "./Navlinking";
// import { useContext } from "react";
// import { ThemeContext } from "../context/ThemeContext";
function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, login } = useAuth();
  console.log(user, isAuthenticated, "Text data for useAuth----------");
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
        <NavLinking to="/users" name="Users" />

        <button
          onClick={toggleTheme}
          className="bg-white text-black px-3 py-1 rounded"
        >
          {theme === "light" ? "🌞" : "🌙"}
        </button>

        <button
          className="bg-white text-black items-center py-1 px-2 rounded"
          onClick={() => {
            login({
              id: 1,
              name: "Hrishbah",
              email: "hrishabh77@gmail.com",
            });
          }}
        >
          Login
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
