import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";

import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const MyAddedClass = () => {
  const { user, loading } = useAuth();

  const [axiosSecure] = useAxiosSecure();

  const {
    data: classes = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["classes", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/${user?.email}`);
      //console.log(res.data);
      return res.data;
    },
  });

  const handleDelete = (item) => {
    //console.log("okg");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/class/${item?._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        });
      }
    });
  };

  return (
    <div className="w-full h-full px-5">
      <Helmet>
        <title>Photography School | instructors myClass</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <div>
        <h1 className="text-2xl font-bold">
          Total Added Class : {classes.length}
        </h1>
      </div>
      <div className="w-full h-full">
        <div className="overflow-x-auto">
          <table className="table table-xl table-pin-cols table-pin-rows">
            <thead>
              <tr>
                <th>#</th>
                <td>Name</td>
                <td>ClassImage</td>
                <td> Seats</td>
                <td>Price</td>
                <td>Enroll</td>
                <td>Status</td>
                <th>Feedback</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {classes?.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>{item.className}</td>
                  <td>
                    <img src={item?.classImage} className="w-20 h-14" alt="" />
                  </td>
                  <td>{item.seats}</td>
                  <td>${item.price}</td>
                  <td>{item.enroll}</td>
                  <td>{item.status}</td>
                  <th>{item.feedback}</th>
                  <th className="flex gap-2 items-center justify-center">
                    <Link to={`/dashboard/class-update/${item._id}`}>
                      <button className=" bg-blue-400 rounded-lg p-2 text-white hover:bg-blue-900">
                        <FaEdit className="w-7 h-7"></FaEdit>
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(item)}
                      className=" bg-red-400 rounded-lg p-2 text-white hover:bg-red-900"
                    >
                      <FaTrashAlt className="w-7 h-7"></FaTrashAlt>
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyAddedClass;
