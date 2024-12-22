import { createPaymentOrder } from "../controllers/paymob.controller.js";
import { Router } from "express";
const router = Router();
router.post("/", async (req, res) => {
  try {
    const { amount, currency, phone_number, email } = req.body;
    const paymentOrder = await createPaymentOrder(
      amount,
      currency,
      phone_number,
      email
    );
    res.status(200).json({ message: "Payment order created", paymentOrder });
  } catch (err) {
    res.status(500).json({ message: "Error processing payment" });
  }
});

export default router;
