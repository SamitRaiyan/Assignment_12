import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.css";
import { HiEyeOff, HiEye } from "react-icons/hi";
import { useState } from "react";
import Google from "../Social/Google";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import useAuth from "../../../../Hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const { userLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    // console.log(data);
    setError("");
    userLogin(data.email, data.password)
      .then((result) => {
        const user = result.user;
        //console.log(user);
        Swal.fire({
          title: "User Login Successfully.",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });

        reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        //console.log(error.message);
        if (error.message) {
          setError(error.message);
        }
      });
  };
  return (
    <div>
      <Helmet>
        <title>Photography School | Login</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <div className="hero min-h-screen py-10 px-5 lg:px-28 loginImg">
        <div className="hero-content flex-col lg:flex-row shadow-xl border-2 border-base-300 p-10">
          <div className="text-center w-full lg:w-1/2">
            <div className="w-full">
              <img
                className="w-full h-full"
                src="https://i.ibb.co/ngDFxtF/Wavy-Tech-28-Single-10.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="card w-full h-full shadow-2xl bg-base-100">
              <div className="text-center mt-5">
                <h1 className="text-3xl font-sans font-bold">Login please</h1>
              </div>
              {error && (
                <p className="text-red-500 text-center mt-5"> {error}</p>
              )}

              <div className="border mx-6 border-gray my-3 text-center space-y-3">
                <h1 className="text-2xl underline font-sans font-bold">
                  Testing This Website
                </h1>
                <p>Admin Email : admin@gmail.com</p>
                <p>Admin password : 123456A!</p>
              </div>
              <form onSubmit={handleSubmit(handleLogin)} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    {...register("email", { required: "email is required" })}
                    name="email"
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
                <div className="form-control relative">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    {...register("password", {
                      required: "password is required",
                    })}
                    type={`${show ? "text" : "password"}`}
                    name="password"
                    placeholder="password"
                    className="input input-bordered"
                  />
                  <div
                    onClick={() => setShow(!show)}
                    className="absolute top-14 cursor-pointer right-5"
                  >
                    {show ? <HiEye></HiEye> : <HiEyeOff></HiEyeOff>}
                  </div>
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
                <label htmlFor="">
                  <h1>
                    You have an new?Please{" "}
                    <Link className="text-blue-400" to="/signup">
                      Register
                    </Link>
                  </h1>
                </label>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Login</button>
                </div>
                <div className="divider">OR</div>
                <div>
                  <Google></Google>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
