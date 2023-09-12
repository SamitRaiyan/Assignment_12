import { Helmet } from "react-helmet";
import useAuth from "../../../Hooks/useAuth";

const StudentHome = () => {
  const { user } = useAuth();
  return (
    <div>
      <Helmet>
        <title>Photography School | student Dashboard</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <h2>Welcome Students {user?.displayName}</h2>
    </div>
  );
};

export default StudentHome;
