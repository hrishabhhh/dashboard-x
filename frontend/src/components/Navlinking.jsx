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
            ? "text-grey-500 font-bold"
            : "text-white hover:text-black-300"
        }
      `
      }
    >
      {name}
    </NavLink>
  );
}

export default NavLinking;
