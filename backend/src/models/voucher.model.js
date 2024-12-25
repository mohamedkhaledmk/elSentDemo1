import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    code: { type: String, required: true },
  },
  {
    timestamps: true,
  });

const Voucher = mongoose.model("Voucher", voucherSchema);

export default Voucher;