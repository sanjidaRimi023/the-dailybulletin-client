// PrivateRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import LoadSpinner from "../Components/Ui/LoadSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);


  if (loading) return <LoadSpinner/>;

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
