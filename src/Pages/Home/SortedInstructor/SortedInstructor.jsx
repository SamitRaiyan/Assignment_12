import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SortedInstructor = () => {
  const [topInstructor, setTopInstructor] = useState([]);

  useEffect(() => {
    axios
      .get("https://photgraphy-school-server.vercel.app/instructor/class-sort")
      .then((res) => {
        //console.log(res.data);
        setTopInstructor(res.data);
      });
  }, []);

  return (
    <div className="px-5 lg:px-28 py-10">
      <div className="w-3/4 mx-auto text-center space-y-4 my-10">
        <h1 className="text-4xl font-sans font-bold">Top Instructors</h1>
        <p className="my-8 font-sans text-xl">
          The only thing he seems to like more than landscape photography is
          sharing everything he knows about it. Want to learn even more about
          building a landscape photography business? Check out our guides on
          building .
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-10 mb-10">
        {topInstructor?.map((item, index) => (
          <motion.div
            whileHover={{
              scale: 1.1,
              textShadow: "0px 0px 8px rgb(255,255,255)",
              boxShadow: "0px 0px 8px rgb(0,0,153)",
            }}
            key={index}
            className="card card-compact w-full h-full bg-base-100 border-2 border-[#570DF8]"
          >
            <figure className="my-5">
              <img
                src={item?.instructorImage}
                alt="instructor"
                className="w-1/2 h-28 rounded-full"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Email: {item?.instructorEmail}</h2>
              <div className="flex justify-between items-center">
                <p>Name : {item?.instructorName}</p>
                <p>Enroll : {item?.enrollSum}</p>
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-sm btn-primary">See Class</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="text-center">
        <Link to="/instructors">
          <motion.button
            whileHover={{
              scale: 1.1,
              textShadow: "0px 0px 8px rgb(255,255,255)",
              boxShadow: "0px 0px 8px rgb(0,0,153)",
            }}
            className="btn btn-primary"
          >
            See more instructor
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default SortedInstructor;
