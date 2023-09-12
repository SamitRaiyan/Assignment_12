import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: "https://photgraphy-school-server.vercel.app",
});

const useAxiosSecure = () => {
  const { userLogeOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    });

    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          await userLogeOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [userLogeOut, navigate]);
  return [axiosSecure];
};

export default useAxiosSecure;
