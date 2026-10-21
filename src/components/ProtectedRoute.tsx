import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

interface ProtectedRouteProps {
  role?: "student" | "admin";
}

export default function ProtectedRoute({
  role,
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="auth-loading">
        <div className="auth-loading-card">
          <div className="loading-spinner" />
          <span>Loading Campus OS...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  if (role && user.role !== role) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}