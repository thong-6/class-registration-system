import { Navigate } from "react-router-dom";

export default function RoleRoute({ role, children }: any) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}
