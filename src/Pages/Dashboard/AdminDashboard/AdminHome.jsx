import { Helmet } from "react-helmet";
import useAuth from "../../../Hooks/useAuth";

const AdminHome = () => {
  const { user } = useAuth();
  return (
    <div>
      <Helmet>
        <title>Photography School |Admin Dashboard</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <h2 className="text-4xl font-sans font-bold">
        Welcome Admin {user?.displayName}
      </h2>
    </div>
  );
};

export default AdminHome;
