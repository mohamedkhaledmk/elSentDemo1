import Voucher from "../models/voucher.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js"; // Ensure this import is present


const generateVoucherCode = () => {
    return 'VOUCHER-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};

const createVoucher = asyncHandler(async (req, res) => {
    try {
        const { user } = req.body;
        const voucher = await Voucher.create({
            code: generateVoucherCode(),
            user: user._id 
        });

        if (!voucher) {
            return res.status(500).json(new ApiResponse(500, "Error creating city"));
        }

        res.status(201).json(voucher);
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, error?.message || "Internal server error"));
    }
});



export default {
  createVoucher
};