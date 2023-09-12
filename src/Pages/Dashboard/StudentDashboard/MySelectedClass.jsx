import { FaTrashAlt } from "react-icons/fa";
import useSelectedClass from "../../../Hooks/useSelectedClass";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const MySelectedClass = () => {
  const [selectClass, refetch] = useSelectedClass();
  const [axiosSecure] = useAxiosSecure();

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
        axiosSecure.delete(`/cart/${item?._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        });
      }
    });
  };
  return (
    <div className="w-full h-full my-5 px-5">
      <Helmet>
        <title>Photography School | student selectedClass</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <div className="text-center space-y-3 mb-5">
        <h2 className="text-2xl font-sans font-bold">My Selected All Class</h2>
        <h1 className="text-2xl text-orange-400 font-sans font-bold">
          total selected Class: {selectClass.length}
        </h1>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>ClassImage</th>
                <th>ClassName</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {selectClass.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>
                    <img className="w-22 h-12" src={item.classImage} alt="" />
                  </td>
                  <td>{item.className}</td>
                  <td className="text-orange-500 font-bold text-end">
                    ${item.price}
                  </td>
                  <th className="flex items-center justify-between">
                    <button
                      onClick={() => handleDelete(item)}
                      className=" bg-red-400 rounded-lg p-2 text-white hover:bg-red-900"
                    >
                      <FaTrashAlt className="w-6 h-6"></FaTrashAlt>
                    </button>
                    <Link to={`/dashboard/payment/${item._id}`}>
                      <button className=" bg-blue-400 rounded-lg p-2 text-white hover:bg-blue-900">
                        Pay
                      </button>
                    </Link>
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

export default MySelectedClass;
