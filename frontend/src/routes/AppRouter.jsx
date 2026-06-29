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

function AppRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/Login",
          element: <Login />,
        },
        {
          path: "/Posts",
          element: <Posts />,
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
