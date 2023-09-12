import { useContext } from "react";
import { AuthContextProvider } from "../AuthProvider/AuthProvider";

const useAuth = () => {
  const auth = useContext(AuthContextProvider);
  return auth;
};

export default useAuth;
