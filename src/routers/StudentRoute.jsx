import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import Loading from "../Pages/Loading/Loading";

const StudentRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [userRole, isLoading] = useRole();

  if (loading || isLoading) {
    return <Loading></Loading>;
  }

  if (user && userRole?.student?.student) {
    return children;
  }
  return <Navigate to="/"></Navigate>;
};

export default StudentRoute;
