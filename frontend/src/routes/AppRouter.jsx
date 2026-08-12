import {
  // BrowserRouter,
  createBrowserRouter,
  // Route,
  RouterProvider,
  // Routes,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Users from "../pages/Users";
import Login from "../pages/Login";
import Posts from "../pages/Posts";
import Register from "../pages/Register";
import VerifyOtp from "../pages/verify-otp";
import ResetPassword from "../pages/resetPass";
import ForgotPassword from "../pages/forgotPass";
import ProtectedRoutes from "../components/ProtectedRoutes";
import AuthLayout from "../layouts/AuthLayout";

function AppRouter() {
  const router = createBrowserRouter([
    {
      element: <AuthLayout />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/verify-otp",
          element: <VerifyOtp />,
        },
        {
          path: "/forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "/reset-password",
          element: <ResetPassword />,
        },
      ],
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          element: <ProtectedRoutes />,
          children: [
            {
              path: "users",
              element: <Users />,
            },
            {
              path: "posts",
              element: <Posts />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      {/* <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />} />
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </BrowserRouter> */}
      <RouterProvider router={router} />
    </>
  );
}

export default AppRouter;
