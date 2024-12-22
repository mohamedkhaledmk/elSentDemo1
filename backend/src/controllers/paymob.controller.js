import axios from "axios";

// Create order for Paymob
async function createPaymentOrder(amount, currency, phone_number, email) {
  try {
    const response = await axios.post(`${process.env.PAYMOB_URL}`, {
      auth_token: process.env.PAYMOB_API_KEY,
      integration_id: process.env.PAYMOB_INTEGRATION_ID,
      amount_cents: 1 * 100, // 1 EGP = 100 cents
      currency,
      order_shipping_data: {
        first_name: "John",
        last_name: "Doe",
        email,
        phone_number,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating payment order:", error.message);
    throw error;
  }
}

export { createPaymentOrder };
