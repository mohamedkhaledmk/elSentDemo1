import { createPaymentOrder } from "../controllers/paymob.controller.js";
import { Router } from "express";
import { verifyUser } from "../middlewares/auth.middleware.js";
const router = Router();

// POST route to create the payment order
// router.post("/", createPaymentOrder);
router.route("/").post(verifyUser, createPaymentOrder);

export default router;
