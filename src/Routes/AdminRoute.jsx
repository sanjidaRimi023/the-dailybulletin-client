import { Navigate, useLocation } from "react-router";
import useUserRole from "../Hooks/useUserRole";

import LoadSpinner from "../Components/Ui/LoadSpinner";
import useAuth from "../Hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <LoadSpinner />;
  }

  if (user && role === "admin") {
    return children;
  }

  return <Navigate to="/forbidden-page" state={{ from: location }} replace />;
};

export default AdminRoute;
