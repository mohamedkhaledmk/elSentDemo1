import express from 'express';
import { fetchAndStoreMetalPrices, getAllMetalPrices } from '../controllers/metalPrice.controller.js';

const router = express.Router();

router.route("/metals/fetch").get(fetchAndStoreMetalPrices);
router.route("/").get(getAllMetalPrices);

export default router;