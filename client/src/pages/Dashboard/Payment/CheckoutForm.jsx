import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCarts from "../../../hooks/useCarts";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [carts, refetch] = useCarts();
  const totalPrice = carts.reduce((total, item) => total + item.price, 0);

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("Error", error);
      setError(error.message);
    } else {
      console.log("PaymentMethod", paymentMethod);
      setError("");
    }

    const { paymentIntent, error: paymentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      });

    if (paymentError) {
      console.log("Payment error: ", paymentError);
    }
    if (paymentIntent) {
      console.log("Payment intent: ", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        const payment = {
          date: new Date(),
          email: user.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          cartsId: carts.map((item) => item._id),
          menuId: carts.map((item) => item._id),
          status: "pending",
        };
        const res = await axiosSecure.post("/payments", payment);
        if (res.data.deleteResult.deletedCount > 0) {
          refetch();
        }
        if (res.data.paymentResult.insertedId) {
          Swal.fire("Payment Successfully");
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
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
        type="submit"
        disabled={!stripe || !clientSecret}
        className="text-xl text-white cursor-pointer rounded-lg font-bold py-5 px-44 bg-indigo-600 hover:bg-indigo-700 transition"
      >
        Pay
      </button>
      <p className="text-red-600 font-bold my-5">{error}</p>
      {transactionId && (
        <p className="text-green-600 font-bold">
          {" "}
          Transaction Id: {transactionId}
        </p>
      )}
    </form>
  );
};

export default CheckoutForm;
