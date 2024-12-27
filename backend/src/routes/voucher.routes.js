import express from 'express';
import { getAllVouchers, disableAllVouchers } from '../controllers/voucher.controller.js';

const router = express.Router();

router.route("/").get(getAllVouchers);
router.route("/disable").put(disableAllVouchers);

export default router;