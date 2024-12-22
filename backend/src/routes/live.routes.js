import { Router } from "express";
import {
  getLink,
  updateLink,
  addLink,
} from "../controllers/live.controller.js";

const router = Router();

router.route("/").get(getLink).put(updateLink).patch(updateLink).post(addLink);

export default router;
