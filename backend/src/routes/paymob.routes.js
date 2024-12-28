import {
  capture,
  createPaymentOrder,
  preAuthorize,
  refund,
  voidPreAuthorization,
} from "../controllers/paymob.controller.js";
import { Router } from "express";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { holdAmount } from "../controllers/paymob.controller2.js";

const router = Router();

// POST route to create the payment order
// router.post("/", createPaymentOrder); /api/v1/paymob
router.route("/").post(verifyUser, createPaymentOrder);
router.route("/capture").post(capture);
router.route("/preauthorize").post(preAuthorize);
router.route("/void").post(voidPreAuthorization);
router.route("/refund").post(refund);
router.route("/hold").post(verifyUser, holdAmount);

export default router;
