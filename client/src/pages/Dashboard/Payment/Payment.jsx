import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

// TODO: Add Stripe PK Key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Secret_Key);
const Payment = () => {
  return (
    <div className="space-y-16 text-center my-20">
      <h2 className=" uppercase text-4xl">Payment</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm/>
      </Elements>
    </div>
  );
};

export default Payment;
