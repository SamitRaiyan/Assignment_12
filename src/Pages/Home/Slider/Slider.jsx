import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Loading from "../../Loading/Loading";

const Slider = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://photgraphy-school-server.vercel.app/sliders")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(true);
      });
  }, []);
  // console.log(data);

  return (
    <motion.div
      initial={{ x: "20vw" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", delay: 0.5 }}
    >
      {loading ? (
        <Swiper
          navigation={true}
          autoplay
          modules={[Navigation]}
          className="mySwiper"
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className="hero min-h-screen"
                style={{ backgroundImage: `url(${item.img})` }}
              >
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content  text-neutral-content">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1.5 }}
                    className="w-3/4 lg:w-1/2"
                  >
                    <h1 className="mb-5 text-5xl font-bold">{item.title}</h1>
                    <p className="mb-5">{item.description}</p>
                    <motion.button
                      whileHover={{
                        scale: 1.1,
                        textShadow: "0px 0px 8px rgb(255,255,255)",
                        boxShadow: "0px 0px 8px rgb(255,255,255)",
                      }}
                      className="btn btn-primary"
                    >
                      Read More
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide> */}
        </Swiper>
      ) : (
        <Loading></Loading>
      )}
    </motion.div>
  );
};

export default Slider;
