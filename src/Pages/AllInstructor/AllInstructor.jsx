import { useLoaderData } from "react-router-dom";
import MenuInstructor from "./MenuInstructor";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

const AllInstructor = () => {
  const instructors = useLoaderData();
  //console.log(instructors);

  return (
    <>
      <Helmet>
        <title>Photography School | instructors</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <MenuInstructor></MenuInstructor>
      <div className="px-5 lg:px-28 my-9">
        <h1 className="text-4xl text-center font-bold  mb-10">
          All Instructors
        </h1>

        <div className="grid lg:grid-cols-3 gap-10 my-8">
          {instructors.map((item) => (
            <motion.div
              whileHover={{
                scale: 1.1,
                textShadow: "0px 0px 8px rgb(255,255,255)",
                boxShadow: "0px 0px 8px rgb(0,0,153)",
              }}
              key={item._id}
              className="card card-compact w-full h-full bg-base-100 border-2 border-[#570DF8]"
            >
              <figure className="my-5">
                <img
                  src={item?.image}
                  alt="instructor"
                  className="w-1/2 h-28 rounded-full"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Email: {item?.email}</h2>
                <p>Name : {item?.name}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-sm btn-primary">See Class</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllInstructor;
