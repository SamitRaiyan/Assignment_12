import { Helmet } from "react-helmet";
import Slider from "../Slider/Slider";
import SortedClass from "../SortedClass/SortedClass";
import SortedInstructor from "../SortedInstructor/SortedInstructor";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Photography School | Home</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <Slider></Slider>
      <SortedClass></SortedClass>
      <SortedInstructor></SortedInstructor>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
