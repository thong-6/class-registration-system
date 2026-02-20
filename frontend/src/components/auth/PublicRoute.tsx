import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  console.log(user)
  if (token) {
    if (user.role === "Admin") return <Navigate to="/admin" replace />;
    if (user.role === "Student") return <Navigate to="/" replace />;
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
