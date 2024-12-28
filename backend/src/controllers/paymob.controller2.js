const PAYMOB_API_KEY = process.env.PAYMOB_API_KEY;
const PAYMOB_INTEGRATION_ID_Online_Card =
  process.env.PAYMOB_INTEGRATION_ID_Online_Card;
const PAYMOB_API_URL = process.env.PAYMOB_API_URL;
import axios from "axios";

export const holdAmount = async (req, res) => {
  console.log("usersssss", req.user);
  try {
    // const { amount_cents } = req.body;

    // Extract user-related data from req.user
    const { fullName, email, phone, address, city } = req.user;

    // Split fullName into first and last name
    const [first_name, ...lastNameParts] = fullName.split(" ");
    const last_name = lastNameParts.join(" ") || "";

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
        amount_cents: 1000 * 100, // Amount in cents
        amount: 1000,
        currency: "EGP", // Assuming currency is EGP
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
          amount_cents: 1000 * 100,
          expiration: 3600, // Payment key validity duration in seconds
          order_id: orderId,
          billing_data: {
            apartment: "NA",
            email: email,
            floor: "NA",
            first_name: first_name, // Extracted first name
            street: address || "NA",
            building: "NA",
            phone_number: phone || "NA",
            shipping_method: "NA",
            postal_code: "NA",
            city: city || "NA",
            country: "EGY", // Assuming country is Egypt
            last_name: last_name, // Extracted last name
            state: "NA",
          },
          currency: "EGP", // Assuming currency is EGP
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
