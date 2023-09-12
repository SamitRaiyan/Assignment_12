import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import ClassCard from "../Shared/ClassCard/ClassCard";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useSelectedClass from "../../Hooks/useSelectedClass";
import MenuClass from "./MenuClass";
import { Helmet } from "react-helmet";

const AllClass = () => {
  const data = useLoaderData();
  const [selectClass, refetch] = useSelectedClass();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [axiosSecure] = useAxiosSecure();
  const location = useLocation();

  //console.log(selectClass);

  const handleSelectClass = (item) => {
    if (!user && !user?.email) {
      Swal.fire({
        title: "Please at first login",
        text: "You select the class at first login then select the class",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Go to Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    } else {
      //console.log(item);

      const classAllReadySelected = selectClass.find(
        (selectItem) => selectItem.classId == item._id
      );
      //console.log(classAllReadySelected);

      if (classAllReadySelected) {
        return toast.warning("All ready selected the class !");
      }

      const cartInfo = {
        classId: item._id,
        className: item.className,
        classImage: item.classImage,
        userEmail: user?.email,
        price: item.price,
        created_at: new Date().getTime(),
      };

      axiosSecure.post("/cart/class", cartInfo).then((res) => {
        //console.log(res.data);
        if (res.data.insertedId) {
          refetch();
          toast.success("Select the class successfully!");
        }
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Photography School | Classes</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <MenuClass></MenuClass>

      <div className="mt-20 px-6 lg:px-24">
        <div className="my-10 text-center">
          {" "}
          <h1 className="text-4xl font-sans font-bold">All Classes</h1>
        </div>
        <div className="grid lg:grid-cols-3 gap-8 mb-9">
          {data.map((item) => (
            <ClassCard
              handleSelectClass={handleSelectClass}
              key={item._id}
              items={item}
            ></ClassCard>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllClass;
