import { Elements } from "@stripe/react-stripe-js";
import CheckOutFrom from "./CheckOutFrom";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const stripePromise = loadStripe(import.meta.env.VITE_payment_stripe_key);

const Payment = () => {
  const [cart, setCart] = useState({});
  const [axiosSecure] = useAxiosSecure();

  const { id } = useParams();

  useEffect(() => {
    axiosSecure.get(`/cart/${id}`).then((res) => {
      //console.log(res.data);
      setCart(res.data);
    });
  }, [axiosSecure, id]);

  const price = parseFloat(cart.price);
  //console.log(price);

  return (
    <div className="w-full h-full px-7">
      <div className="mt-10">
        <h1 className="text-4xl font-sans font-bold text-center">
          Payment Process.
        </h1>
      </div>
      <div className="w-full mt-20 mx-auto shadow-xl border-2 border-base-200 px-20 py-12">
        <Elements stripe={stripePromise}>
          <CheckOutFrom cart={cart} price={price}></CheckOutFrom>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
