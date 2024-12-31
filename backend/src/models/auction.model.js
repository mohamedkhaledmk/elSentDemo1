import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
      required: true,
    },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    bids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bid" }],
    winner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    paid: { type: Boolean, default: false },
    users: [
      {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        transaction_id: { type: String },
      },
    ],
    status: {
      type: String,
    },
    location: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
    //image: { type: String },
    images: [{ type: String }],
    startingPrice: { type: Number, required: true },
    paid: {
      type: Boolean,
      default: false,
    },
    height: { type: Number, required: [true, "Height is required"] },
    width: { type: Number, required: [true, "Width is required"] },
    length: { type: Number, required: [true, "Length is required"] },
    weight: { type: Number, required: [true, "Weight is required"] },
    incrementPrice: { type: Number, required: [true, "Increment is required"] },
    workmanshipFee: {
      type: Number,
      required: [true, "Workmanship Fee is required"],
    },
    materialUsed: { type: String },
  },
  {
    timestamps: true,
  }
);

const Auction = mongoose.model("Auction", auctionSchema);

export default Auction;
