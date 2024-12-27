import {
  capture,
  createPaymentOrder,
  preAuthorize,
  refund,
  voidPreAuthorization,
} from "../controllers/paymob.controller.js";
import { Router } from "express";
import { verifyUser } from "../middlewares/auth.middleware.js";
const router = Router();

// POST route to create the payment order
// router.post("/", createPaymentOrder); /api/v1/paymob
router.route("/").post(verifyUser, createPaymentOrder);
router.route("/capture").post(capture);
router.route("/preauthorize").post(preAuthorize);
router.route("/void").post(voidPreAuthorization);
router.route("/refund").post(refund);

export default router;
