import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (token) {
    if (user.role === "ADMIN") return <Navigate to="/admin" replace />;
    if (user.role === "STUDENT") return <Navigate to="/student" replace />;
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
