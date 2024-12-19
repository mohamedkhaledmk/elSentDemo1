import express from 'express';
import { fetchAndStoreMetalPrices } from '../controllers/metalPrice.controller.js';

const router = express.Router();

router.get('/metal-prices', fetchAndStoreMetalPrices);

export default router;