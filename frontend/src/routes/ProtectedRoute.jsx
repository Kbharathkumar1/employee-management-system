import { Navigate } from "react-router-dom";

function ProtectedRoute({ children,allowedRoles }) {

  const user = JSON.parse(localStorage.getItem("user"));

  //Not logged in

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Role not allowed
   if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/employees" />;
  }

  return children;
}

export default ProtectedRoute;