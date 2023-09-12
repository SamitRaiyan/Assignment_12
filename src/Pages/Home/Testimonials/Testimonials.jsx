import "./testimonials.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import { useEffect, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { motion } from "framer-motion";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://photgraphy-school-server.vercel.app/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        //console.log(data);
      });
  }, []);
  return (
    <div className="mb-12">
      <div className="bg-image relative w-full h-[800px]">
        <div className=" absolute z-20 top-28 lg:top-20 right-4 lg:right-32 w-11/12 lg:w-3/4 bg-slate-100 rounded-lg p-4 lg:p-10">
          <div className="text-center mb-10">
            <h1 className="text-blue-800 text-2xl font-sans font-bold">
              Testimonials
            </h1>
            <h1 className="text-4xl font-sans font-bold">
              What our clients say
            </h1>
          </div>
          <Swiper
            cssMode={true}
            navigation={true}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper"
          >
            {reviews.map((item) => (
              <SwiperSlide key={item.id}>
                <div className=" w-3/2 h-96 py-12">
                  <div>
                    <div className=" w-full mx-auto ms-28 lg:ms-96">
                      <div className="lg:flex gap-6 items-center">
                        <div className="avatar">
                          <motion.div
                            whileHover={{
                              scale: 1.5,
                              textShadow: "0px 0px 8px rgb(255,255,255)",
                              boxShadow: "0px 0px 8px rgb(0,0,153)",
                            }}
                            className="w-12 lg:w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                          >
                            <img src={item.image_url} />
                          </motion.div>
                        </div>
                        <div>
                          <h1 className="text-2xl font-sans font-bold">
                            {item.title}
                          </h1>
                          <p>{item.role}</p>
                        </div>
                      </div>

                      <div className="my-7 lg:ms-12">
                        <FaQuoteLeft className="w-14 h-9"></FaQuoteLeft>
                      </div>
                    </div>
                    <div className="text-center px-3 text-xs lg:text-xl lg:px-10">
                      <p>{item.description}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
