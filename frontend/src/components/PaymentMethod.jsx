import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "../store/auth/authSlice";
import { toast } from "react-toastify";

// Load Stripe
const stripePromise = loadStripe(
  "pk_test_51QWmgRGI6UEWLGcVeJIZTm52JfHmGvWi4mngrQCRIk2enq1kuuY9Ta8LOLEainpfIatEw6YZegKPaKwk0wvz7g0A00S8xc1cJA"
);

const CheckoutForm = () => {
  const { user } = useSelector((state) => state.auth);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {}, [user]);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      //console.error("Stripe.js has not yet loaded.");
      toast.error("Stripe.js has not yet loaded.");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Create payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: name,
        email: email,
        address: {
          line1: address,
        },
      },
    });

    if (error) {
      toast.error(`Error: ${error.message}`);
    } else {
      // Check if payment is verified
      if (user?.paymentVerified) {
        axios
          .post(
            "https://el-sent-demo1-backend.vercel.app//api/v1/payments/update-payment-method",
            { paymentMethodId: paymentMethod.id },
            { withCredentials: true }
          )
          .then((response) => {
            toast.success("Payment Method Updated Successfully");
            setName("");
            setEmail("");
            setAddress("");
            cardElement.clear();
          })
          .catch((error) => {
            //console.error("Error updating payment method:", error);
            toast.error(
              `Error updating: ${error.response?.data?.message || error.message || "Unknown error occurred"}`
            );
          });
      } else {
        axios
          .post(
            "https://el-sent-demo1-backend.vercel.app//api/v1/payments/add-payment-method",
            { paymentMethodId: paymentMethod.id },
            { withCredentials: true }
          )
          .then((response) => {
            if (response.status === 200) {
              toast.success("Payment Method Added Successfully");
              setName("");
              setEmail("");
              setAddress("");
              cardElement.clear();
            } else {
              toast.error("Failed to add payment method");
            }
          })
          .catch((error) => {
            toast.error(
              `Error adding: ${error.response?.data?.message || error.message || "Unknown error occurred"}`
            );
          });
      }
    }
  };

  return (
    <div className="px-7 pt-4 pb-10 w-full bg-theme-bg rounded-2xl">
      <h1 className="text-white font-bold text-xl border-b border-border-info-color pb-3 mb-5">
        Payment Method
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:w-[450px] gap-3 inputs:outline-none inputs:px-2 inputs:py-[10px] inputs:rounded-md inputs:white [&_button[type=submit]]:bg-theme-color [&_button:hover[type=submit]]:bg-color-danger inputs:border inputs:border-border-info-color focus:inputs:border-theme-color select:border select:border-border-info-color inputs:placeholder-body-text-color inputs:text-sm [&_*]:transition-all"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name on card"
          required
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          required
        />
        <CardElement className="outline-none px-2 py-3 rounded-md bg-white border border-border-info-color focus:border-theme-color placeholder-body-text-color" />
        <button
          type="submit"
          disabled={!stripe}
          className="px-3 py-4 rounded-xl text-white cursor-pointer font-bold tracking-wide"
        >
          {user?.paymentVerified
            ? "Update Payment Method"
            : "Add Payment Method"}
        </button>
      </form>
    </div>
  );
};

const PaymentMethod = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default PaymentMethod;
