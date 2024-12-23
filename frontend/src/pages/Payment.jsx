import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Don't forget to import the styles

const countryList = [
  { name: "Egypt", code: "EG" },
  { name: "United States", code: "US" },
  { name: "Canada", code: "CA" },
  { name: "United Kingdom", code: "GB" },
  { name: "Germany", code: "DE" },
  // Add more countries as needed
];

const PaymentPage = () => {
  // State for user input
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState(1); // Default 1 EGP for testing
  const [currency] = useState("EGP"); // Egyptian Pound
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentLink, setPaymentLink] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create the request body with the required format
      const requestData = {
        amount_cents: amount * 100, // Convert to cents (1 EGP = 100 cents)
        currency,
        order_shipping_data: {
          first_name: firstName,
          last_name: lastName,
          email,
          phone_number: phoneNumber,
          street,
          city,
          postal_code: postalCode,
          country,
          state,
        },
        product_name: productName,
        product_description: productDescription,
      };

      // Send request to the backend to create the payment order
      const response = await axios.post(
        "http://localhost:8000/api/v1/paymob", // Update the endpoint as needed
        requestData
      );

      if (response.data && response.data.payment_link) {
        setPaymentLink(response.data.payment_link);
        setLoading(false);
        toast.success("Payment link generated successfully!");
      } else {
        setLoading(false);
        toast.error("Payment link not received.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during payment creation:", error);
      toast.error("An error occurred while processing the payment.");
    }
  };

  return (
    <div className="min-h-screen bg-theme-bg text-body-text-color flex items-center justify-center p-4">
      <div className="bg-theme-bg-light p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-heading-color mb-6 text-center">
          Pay with Paymob
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Name */}
          <div className="flex flex-col">
            <label htmlFor="firstName" className="text-secondary text-sm">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="mt-2 p-3 rounded-md bg-theme-bg2 text-body-text-color border-2 border-theme-color focus:outline-none focus:ring-2 focus:ring-theme-color"
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label htmlFor="lastName" className="text-secondary text-sm">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="mt-2 p-3 rounded-md bg-theme-bg2 text-body-text-color border-2 border-theme-color focus:outline-none focus:ring-2 focus:ring-theme-color"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-secondary text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 p-3 rounded-md bg-theme-bg2 text-body-text-color border-2 border-theme-color focus:outline-none focus:ring-2 focus:ring-theme-color"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label htmlFor="phoneNumber" className="text-secondary text-sm">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="mt-2 p-3 rounded-md bg-theme-bg2 text-body-text-color border-2 border-theme-color focus:outline-none focus:ring-2 focus:ring-theme-color"
            />
          </div>

          {/* Amount */}
          <div className="flex flex-col">
            <label htmlFor="amount" className="text-secondary text-sm">
              Amount (EGP)
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="mt-2 p-3 rounded-md bg-theme-bg2 text-body-text-color border-2 border-theme-color focus:outline-none focus:ring-2 focus:ring-theme-color"
            />
          </div>

          {/* Product Name */}
          <div className="flex flex-col">
            <label htmlFor="productName" className="text-secondary text-sm">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              className="mt-2 p-3 rounded-md bg-theme-bg2 text-body-text-color border-2 border-theme-color focus:outline-none focus:ring-2 focus:ring-theme-color"
            />
          </div>

          {/* Product Description */}
          <div className="flex flex-col">
            <label
              htmlFor="productDescription"
              className="text-secondary text-sm"
            >
              Product Description
            </label>
            <textarea
              id="productDescription"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              required
              className="mt-2 p-3 rounded-md bg-theme-bg2 text-body-text-color border-2 border-theme-color focus:outline-none focus:ring-2 focus:ring-theme-color"
            />
          </div>

          {/* Shipping Address Fields */}
          <div className="flex flex-col">
            <label htmlFor="street" className="text-secondary text-sm">
              Street Address
            </label>
            <input
              type="text"
              id="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
              className="mt-2 p-3 rounded-md bg-theme-bg2 text-body-text-color border-2 border-theme-color focus:outline-none focus:ring-2 focus:ring-theme-color"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="city" className="text-secondary text-sm">
              City
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="mt-2 p-3 rounded-md bg-theme-bg2 text-body-text-color border-2 border-theme-color focus:outline-none focus:ring-2 focus:ring-theme-color"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="postalCode" className="text-secondary text-sm">
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
              className="mt-2 p-3 rounded-md bg-theme-bg2 text-body-text-color border-2 border-theme-color focus:outline-none focus:ring-2 focus:ring-theme-color"
            />
          </div>

          {/* Country Dropdown */}
          <div className="flex flex-col">
            <label htmlFor="country" className="text-secondary text-sm">
              Country
            </label>
            <select
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className="mt-2 p-3 rounded-md bg-theme-bg2 text-body-text-color border-2 border-theme-color focus:outline-none focus:ring-2 focus:ring-theme-color"
            >
              <option value="">Select Country</option>
              {countryList.map((countryItem) => (
                <option key={countryItem.code} value={countryItem.code}>
                  {countryItem.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="state" className="text-secondary text-sm">
              State
            </label>
            <input
              type="text"
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              className="mt-2 p-3 rounded-md bg-theme-bg2 text-body-text-color border-2 border-theme-color focus:outline-none focus:ring-2 focus:ring-theme-color"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-theme-color text-color-white rounded-md hover:bg-hover transition duration-300 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Processing Payment..." : "Pay Now"}
          </button>
        </form>

        {paymentLink && (
          <div className="mt-6 text-center">
            <p className="text-secondary text-sm">
              Click below to complete your payment:
            </p>
            <a
              href={paymentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-color-primary hover:text-hover text-lg font-semibold"
            >
              Complete Payment
            </a>
          </div>
        )}
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar />
    </div>
  );
};

export default PaymentPage;
