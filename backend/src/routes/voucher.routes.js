import express from 'express';
import { getAllVouchers } from '../controllers/voucher.controller.js';

const router = express.Router();

router.route("/").get(getAllVouchers);

export default router;