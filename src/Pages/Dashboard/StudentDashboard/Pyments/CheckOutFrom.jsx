import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useSelectedClass from "../../../../Hooks/useSelectedClass";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const CheckOutFrom = ({ cart, price }) => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [, refetch] = useSelectedClass();
  const [processing, setProcessing] = useState(false);

  // console.log(cart);

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        //console.log("paisi", res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [axiosSecure, price]);
  //console.log(clientSecret);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    console.log(card);
    // Use your card Element with other Stripe.js APIs
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
    } else {
      setCardError("");
      //console.log("[PaymentMethod]", paymentMethod);
    }
    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "unknown",
          },
        },
      });

    if (confirmError) {
      console.log("error paisi", confirmError);
      setCardError(confirmError.message);
    }

    setCardError("");
    //console.log("payment intent", paymentIntent);
    setProcessing(false);
    if (paymentIntent.status === "succeeded") {
      // save payment information to the server
      const payment = {
        email: user?.email,
        name: user?.displayName,
        transactionId: paymentIntent.id,
        price,
        cartId: cart?._id,
        classId: cart?.classId,
        classImage: cart?.classImage,
        className: cart?.className,
        status: "pending",
        created_at: new Date().getTime(),
      };
      console.log(payment);

      axiosSecure.post("/payments", payment).then((res) => {
        console.log(res.data);
        if (res.data.paymentResult.insertedId) {
          setTransactionId(paymentIntent.id);
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your payments successfully Done!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }
  };

  return (
    <div>
      <Helmet>
        <title>Photography School | students payments</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <form onSubmit={handleSubmit}>
        <CardElement
          className="border border-base-200 p-2 rounded-lg"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-sm btn-success mt-4"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>

        <div className="mt-3">
          {cardError && <p className="text-red-500 font-sans">{cardError}</p>}
          {transactionId && (
            <p className="text-green-500 font-sans">
              Payment Successfully done Your TransactionId is: {transactionId}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default CheckOutFrom;
