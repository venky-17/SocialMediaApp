import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase/Configure";
import AuthHome from "./AuthHome";

const ProtectedRoute = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
    return null; // Return null when the user is not authenticated
  }

  // Render the AuthHome component when the user is authenticated
  return (
    <div>
      <AuthHome/>
    </div>
  );
};

export default ProtectedRoute;
