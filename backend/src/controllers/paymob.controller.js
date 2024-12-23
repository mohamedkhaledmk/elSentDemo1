import axios from "axios";
const PAYMOB_API_KEY = process.env.PAYMOB_API_KEY;
const PAYMOB_INTEGRATION_ID_Online_Card =
  process.env.PAYMOB_INTEGRATION_ID_Online_Card;

// Payment Controller function for creating the payment order
export const createPaymentOrder = async (req, res) => {
  try {
    const { amount_cents, currency, order_shipping_data } = req.body;
    const { email, first_name, last_name, phone_number } = order_shipping_data;

    // Step 1: Authenticate
    const authResponse = await axios.post(
      "https://accept.paymob.com/api/auth/tokens",
      {
        api_key: PAYMOB_API_KEY,
      }
    );

    if (!authResponse.data.token) {
      return res
        .status(500)
        .json({ message: "Failed to obtain authentication token" });
    }

    const token = authResponse.data.token;

    // Step 2: Create Order
    const orderResponse = await axios.post(
      "https://accept.paymob.com/api/ecommerce/orders",
      {
        auth_token: token,
        delivery_needed: false,
        amount_cents: amount_cents, // Convert amount to cents
        currency,
        items: [
          {
            name: "Product Name", // Replace with actual product name
            amount_cents: amount_cents * 100,
            description: "Payment for product/service",
            quantity: 1,
          },
        ],
      }
    );

    if (!orderResponse.data.id) {
      return res.status(500).json({ message: "Failed to create order" });
    }

    const orderId = orderResponse.data.id;

    // Step 3: Generate Payment Key
    try {
      const paymentKeyResponse = await axios.post(
        "https://accept.paymob.com/api/acceptance/payment_keys",
        {
          auth_token: token,
          amount_cents: amount_cents * 100,
          expiration: 3600, // Payment key validity duration in seconds
          order_id: orderId,
          billing_data: {
            apartment: "NA",
            email: email,
            floor: "NA",
            first_name: "John", // Replace with dynamic customer data
            street: "NA",
            building: "NA",
            phone_number: phone_number,
            shipping_method: "NA",
            postal_code: "NA",
            city: "NA",
            country: "EGY", // Replace with the user's actual country code
            last_name: "Doe", // Replace with dynamic customer data
            state: "NA",
          },
          currency,
          integration_id: PAYMOB_INTEGRATION_ID_Online_Card,
        }
      );
      if (!paymentKeyResponse.data.token) {
        console.error("Payment Key Response:", paymentKeyResponse.data);
        return res
          .status(500)
          .json({ message: "Failed to generate payment key" });
      }

      const paymentKey = paymentKeyResponse.data.token;

      // Redirect to Payment Link
      const paymentURL = `https://accept.paymob.com/api/acceptance/iframes/${process.env.PAYMOB_IFRAME_ID}?payment_token=${paymentKey}`;
      console.log(paymentURL, "paymentURL");
      return res.status(200).json({ payment_link: paymentURL });
    } catch (error) {
      console.error(
        "Error in Step 3 (Payment Key Generation):",
        error.response?.data || error.message
      );
      return res.status(500).json({
        message: "Error generating payment key",
        details: error.response?.data || error.message,
      });
    }
  } catch (error) {
    console.error(
      "Error processing payment:",
      error.response?.data || error.message
    );
    res.status(500).json({ message: "Error processing payment" });
  }
};
