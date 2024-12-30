import {
  capture,
  createPaymentOrder,
  preAuthorize,
  refund,
  voidPreAuthorization,
  webHookController,
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
const PAYMOB_API_BASE = "https://flashapi.paymob.com/v1";
const PAYMOB_SECRET_KEY =
  "egy_sk_test_b0f13684c445ed2b03c82733004d4f1100c3accb2f590e3fd216f4c17a0dc40c";

router.route("/webhook").post(webHookController);

export default router;
