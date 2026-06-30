import { NavLink } from "react-router-dom";

function NavLinking({ name, to, className = "" }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        ${className}
        transition-colors duration-400
        ${
          isActive
            ? "text-black-300 font-semibold"
            : "text-white hover:text-gray-200"
        }
      `
      }
    >
      {name}
    </NavLink>
  );
}

export default NavLinking;
