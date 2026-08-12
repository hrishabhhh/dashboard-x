import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function AuthLayout() {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default AuthLayout;
