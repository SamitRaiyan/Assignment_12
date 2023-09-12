import { motion } from "framer-motion";

const MenuInstructor = () => {
  return (
    <motion.div
      initial={{ y: "20vh" }}
      animate={{ y: 0 }}
      transition={{ type: "spring", delay: 0.5 }}
    >
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url("https://i.ibb.co/nwmd35n/chairs-near-window.jpg")`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <motion.div
            initial={{ opacity: 0, x: "120" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 1.5 }}
            className="w-full lg:w-1/2"
          >
            <h1 className="mb-5 text-5xl font-bold">Our All Instructor Here</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <motion.button
              whileHover={{
                scale: 1.1,
                textShadow: "0px 0px 8px rgb(255,255,255)",
                boxShadow: "0px 0px 8px rgb(255,255,255)",
              }}
              className="btn btn-primary"
            >
              See More
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuInstructor;
