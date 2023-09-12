import { Link, useNavigate } from "react-router-dom";
import "../Login/Login.css";
import { HiEyeOff, HiEye } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Google from "../Social/Google";
import { Helmet } from "react-helmet";
import useAuth from "../../../../Hooks/useAuth";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import axios from "axios";
import moment from "moment/moment";

const Register = () => {
  const { userRegister } = useAuth();
  const [show, setShow] = useState(false);
  const [cshow, setCshow] = useState(false);
  const [pmachtError, setPmatchErorr] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //handleSubmit
  const handleRegister = (data) => {
    setPmatchErorr("");
    setError("");
    if (data.password !== data.confirmPassword) {
      return setPmatchErorr("Password and confirm password do not match");
    }

    userRegister(data.email, data.password)
      .then((result) => {
        const user = result.user;
        //console.log(user);
        user.displayName = data.name;
        user.photoURL = data.photo;
        updateProfile(user, {
          displayName: data.name,
          photoURL: data.photo,
        });

        const userInfo = {
          name: data.name,
          email: data.email,
          role: "student",
          image: data.photo,
          created_at: new Date().getTime(),
        };

        axios
          .post("https://photgraphy-school-server.vercel.app/users", {
            userInfo,
          })
          .then((res) => {
            if (res.data.insertedId) {
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
              navigate("/");
            }
          });
      })
      .catch((error) => {
        //console.log(error.message);
        if (error.message) {
          setError("Auth Email Already in use.");
        }
      });
  };
  return (
    <div>
      <Helmet>
        <title>Photography School | Register</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <div className="hero min-h-screen px-5 lg:px-28 loginImg">
        <div className="hero-content flex-col lg:flex-row shadow-xl border-2 border-base-300 p-10">
          <div className="text-center w-full lg:w-1/2">
            <div className="w-full">
              <img
                className="w-full h-full"
                src="https://i.ibb.co/71msSzh/Data-security-05.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="card w-full h-full shadow-2xl bg-base-100">
              <div className="text-center mt-5">
                <h1 className="text-2xl lg:text-3xl font-sans font-bold">
                  Please Register First
                </h1>
              </div>
              {error && (
                <p className="text-red-500 text-center mt-3">{error}</p>
              )}
              <form
                onSubmit={handleSubmit(handleRegister)}
                className="card-body"
              >
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    {...register("name")}
                    name="name"
                    type="text"
                    placeholder="name"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email*</span>
                  </label>
                  <input
                    {...register("email", { required: "Email is required" })}
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
                    <span className="label-text">Password*</span>
                  </label>
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password should have at least 6 characters",
                      },
                      pattern: {
                        value: /^(?=.*[A-Z])(?=.*[!@#$&*]).{6,}$/,
                        message:
                          "Password should, one capital letter, and one special character",
                      },
                    })}
                    name="password"
                    type={`${show ? "text" : "password"}`}
                    placeholder="password"
                    className="input input-bordered"
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                  <div
                    onClick={() => setShow(!show)}
                    className="absolute top-14 cursor-pointer right-5"
                  >
                    {show ? <HiEye></HiEye> : <HiEyeOff></HiEyeOff>}
                  </div>
                </div>
                <div className="form-control relative">
                  <label className="label">
                    <span className="label-text">Confirm Password*</span>
                  </label>
                  <input
                    {...register("confirmPassword")}
                    name="confirmPassword"
                    type={`${cshow ? "text" : "password"}`}
                    placeholder="Confirm password"
                    className="input input-bordered"
                  />
                  <div
                    onClick={() => setCshow(!cshow)}
                    className="absolute top-14 cursor-pointer right-5"
                  >
                    {cshow ? <HiEye></HiEye> : <HiEyeOff></HiEyeOff>}
                  </div>
                </div>
                {pmachtError && <p className="text-red-500"> {pmachtError}</p>}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Photo Url</span>
                  </label>
                  <input
                    {...register("photo")}
                    name="photo"
                    type="url"
                    placeholder="photo url"
                    className="input input-bordered"
                  />
                </div>

                <label htmlFor="">
                  <h1>
                    You have an already account?Please{" "}
                    <Link className="text-blue-400" to="/login">
                      Login
                    </Link>
                  </h1>
                </label>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Register</button>
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

export default Register;
