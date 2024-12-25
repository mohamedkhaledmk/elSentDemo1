import { Router } from "express";
import {
  sendVerificationCode,
  verifyCode,
} from "../controllers/emailverification.controller.js";
const router = Router();

router.post("/", sendVerificationCode);
router.post("/code", verifyCode);

export default router;
