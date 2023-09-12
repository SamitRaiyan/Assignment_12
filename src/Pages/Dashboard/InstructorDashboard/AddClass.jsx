import useAuth from "../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const imgHostKey = import.meta.env.VITE_hosted_key;

const AddClass = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const hostUrl = `https://api.imgbb.com/1/upload?key=${imgHostKey}`;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleAddClass = (data) => {
    const formData = new FormData();
    formData.append("image", data.classImage[0]);

    fetch(hostUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgUrl = imgResponse.data.display_url;
          const { className, price, seats, instructorEmail, instructorName } =
            data;
          const classInfo = {
            className,
            classImage: imgUrl,
            instructorEmail,
            instructorName,
            instructorImage: user?.photoURL,
            seats: parseInt(seats),
            price: parseFloat(price),
            status: "pending",
            feedback: "no feedback",
            enroll: parseInt(0),
            created_at: new Date().getTime(),
          };

          axiosSecure.post("/class/add", classInfo).then((res) => {
            if (res.data.insertedId) {
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Item added successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });

          //console.log(classInfo);
        }
      });
  };
  return (
    <div className="w-full h-full px-4">
      <Helmet>
        <title>Photography School | instructors addClass</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <div className="text-center my-4">
        <h1 className="text-3xl font-bold font-sans">Add an Classes</h1>
      </div>
      <form
        onSubmit={handleSubmit(handleAddClass)}
        className="px-5 border-2 shadow-xl py-10 rounded-lg space-y-3"
      >
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Class Name*:</span>
          </label>
          <input
            {...register("className", { required: "name is required" })}
            name="className"
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
          />
        </div>
        {errors.className && (
          <p className="text-red-500">{errors.className.message}</p>
        )}
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Image*:</span>
          </label>
          <input
            {...register("classImage", { required: "photo is required" })}
            type="file"
            className="file-input file-input-bordered w-full "
          />
        </div>
        {errors.classImage && (
          <p className="text-red-500">{errors.classImage.message}</p>
        )}
        <div className="flex gap-5">
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Instructor Name*:</span>
            </label>
            <input
              readOnly
              {...register("instructorName")}
              defaultValue={user?.displayName}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full "
            />
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Instructor Email*:</span>
            </label>
            <input
              {...register("instructorEmail")}
              readOnly
              defaultValue={user?.email}
              type="email"
              placeholder="Type here"
              className="input input-bordered w-full "
            />
          </div>
        </div>
        <div className="flex gap-5">
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Available seats*:</span>
            </label>
            <input
              {...register("seats", { required: "seats is required" })}
              type="number"
              placeholder="Type here"
              className="input input-bordered w-full "
            />
          </div>
          {errors.seats && (
            <p className="text-red-500">{errors.seats.message}</p>
          )}
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Price*:</span>
            </label>
            <input
              {...register("price", { required: "price is required" })}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full "
            />
          </div>
          {errors.price && (
            <p className="text-red-500">{errors.price.message}</p>
          )}
        </div>
        <div>
          <input type="submit" className="btn btn-success" value="Add Class" />
        </div>
      </form>
    </div>
  );
};

export default AddClass;
