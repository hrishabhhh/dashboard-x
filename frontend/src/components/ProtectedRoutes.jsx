import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function ProtectedRoutes() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;
