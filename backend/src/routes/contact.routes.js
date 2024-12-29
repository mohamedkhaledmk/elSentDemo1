import { Router } from "express";
import { contactUs } from "../controllers/contact.controller.js";

const router = Router();
router.route("/").post(contactUs);

export default router;
