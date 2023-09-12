import axios from "axios";
import { useEffect, useState } from "react";
import useRole from "../../../Hooks/useRole";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useSelectedClass from "../../../Hooks/useSelectedClass";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import usePayments from "../../../Hooks/usePayments";
import { motion } from "framer-motion";

const SortedClass = () => {
  const [popularClass, setPopularClass] = useState();
  const [userRole] = useRole();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectClass, refetch] = useSelectedClass();
  const [paymentHistory] = usePayments();
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    axios
      .get("https://photgraphy-school-server.vercel.app/all-classes-sort")
      .then((res) => {
        setPopularClass(res.data);
      });
  }, []);

  //console.log(popularClass);
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
    <div className="px-5 lg:px-28 py-10">
      <div className="text-center my-6 w-3/4 mx-auto">
        <h1 className="text-4xl font-sans font-bold">Top Popular Classes</h1>
        <p className="my-8 font-sans text-xl">
          Cambridge in Colour may not refer to itself as a photo blog site, but
          their philosophy suggests otherwise: instead of showing you how
          something is done, they’ll explain why.
        </p>
      </div>
      <div className="grid lg:grid-cols-3 gap-8 mb-14">
        {popularClass?.map((item) => (
          <motion.div
            initial={{ x: "10vw" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", delay: 0.5 }}
            whileHover={{
              scale: 1.1,
              textShadow: "0px 0px 8px rgb(255,255,255)",
              boxShadow: "0px 0px 8px rgb(0,0,153)",
            }}
            key={item._id}
            className={`card w-full h-full ${
              item?.seats === 0 ? "bg-red-500" : "bg-base-100"
            }  px-5 py-4 shadow-xl`}
          >
            <figure className="px-5 pt-10">
              <img
                src={item?.classImage}
                alt="Shoes"
                className="w-full h-44 rounded-xl"
              />
            </figure>
            <div className="space-y-3">
              <h2 className="card-title mt-3">{item?.className}</h2>
              <div className="flex  justify-between items-center">
                <div className="avatar">
                  <div className="w-6 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={item?.instructorImage} />
                  </div>
                </div>
                <h1 className="text-xl font-bold uppercase flex-1 ms-3">
                  {item?.instructorName}
                </h1>
                <p className="text-xl font-sans font-bold">
                  Enroll : {item?.enroll}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <h1 className="text-xl">
                  Price :{" "}
                  <span className="text-orange-500 font-bold">
                    ${item?.price}
                  </span>
                </h1>
                <div>Available seats : {item?.seats}</div>
              </div>
              <div className="card-actions justify-center">
                <button
                  onClick={() => handleSelectClass(item)}
                  disabled={
                    userRole?.instructor?.instructor ||
                    userRole?.admin?.admin ||
                    item?.seats === 0 ||
                    paymentHistory.find((pay) => pay.classId === item._id)
                  }
                  className="btn btn-sm btn-primary"
                >
                  Select
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <Link to="/classes">
          <motion.button
            whileHover={{
              scale: 1.1,
              textShadow: "0px 0px 8px rgb(255,255,255)",
              boxShadow: "0px 0px 8px rgb(0,0,153)",
            }}
            className="btn btn-primary"
          >
            SEE More Classes
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default SortedClass;
