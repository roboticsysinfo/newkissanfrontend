import { Navigate } from "react-router-dom";

const PrivateRoute = ({ allowedRoles, redirectTo, children }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole"); // Retrieve user role

  // If no token, redirect to login
  if (!token) {
    return <Navigate to={redirectTo} />;
  }

  // If userRole is not allowed, redirect accordingly
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to={redirectTo} />;
  }


  return <>{children}</>;
};

export default PrivateRoute;
