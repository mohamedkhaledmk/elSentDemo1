import { createPaymentOrder } from "../controllers/paymob.controller.js";
import { Router } from "express";
const router = Router();

// POST route to create the payment order
router.post("/", createPaymentOrder);

export default router;
