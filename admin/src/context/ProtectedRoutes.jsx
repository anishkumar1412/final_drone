import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AdminContext } from "./AdminContext"; 

const ProtectedRoute = ({ children, requiredPermission }) => {
  const { dtoken, permissions, aToken } = useContext(AdminContext);

  console.log("dtoken:", dtoken, "aToken:", aToken, "permissions:", permissions);

  // Superadmin (aToken) has full access
  if (aToken) {
    return children;
  }

  // If neither aToken nor dtoken exists, redirect to login
  // if (!dtoken) {
  //   console.log("Redirecting to login...");
  //   return <Navigate to="/login" />;
  // }

  // Wait until permissions are loaded
  if (permissions.length === 0) {
    console.log("Waiting for permissions to load...");
    return null; // or a loading spinner
  }

  // If requiredPermission is set and user lacks it
  if (requiredPermission && !permissions.includes(requiredPermission)) {
    console.log("Redirecting to unauthorized...");
    return <Navigate to="/unauthorized" />;
  }

  return children;
};


export default ProtectedRoute;
