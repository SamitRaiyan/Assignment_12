import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Loading from "../Pages/Loading/Loading";

const AuthRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading></Loading>;
  }

  if (!user) {
    return <Navigate to="/login"></Navigate>;
  }
  return children;
};

export default AuthRoute;
