import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const EnrollClasses = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { data: enrollClass = [] } = useQuery({
    queryKey: ["enrollClass", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/enroll/classes/?email=${user?.email}`
      );
      return res.data;
    },
  });
  //console.log(enrollClass);
  return (
    <div className="w-full h-full px-5">
      <Helmet>
        <title>Photography School | student enrollClass</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <div className="text-center my-8">
        <h1 className="text-3xl font-sans font-bold">
          My Enroll Classes : {enrollClass.length}
        </h1>
      </div>

      <div>
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th>#</th>
                <th>ClassName</th>
                <th>Class Image</th>
                <th>Instructor Info</th>
                <th>Seats</th>
                <th>Enroll Student</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {enrollClass.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>{item.className}</td>
                  <td>
                    <img className="w-22 h-12" src={item.classImage} alt="" />
                  </td>
                  <td>
                    <img
                      className="w-10 h-8 rounded-full"
                      src={item.instructorImage}
                      alt=""
                    />
                    <p>Email: {item.instructorEmail}</p>
                    <p>Name : {item.instructorName}</p>
                  </td>
                  <td>{item.seats}</td>
                  <td>{item.enroll}</td>
                  <td>
                    <button className="btn btn-sm btn-primary">
                      {" "}
                      Play Class
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EnrollClasses;
