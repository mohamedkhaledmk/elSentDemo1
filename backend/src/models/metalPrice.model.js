import mongoose from 'mongoose';

const metalPriceSchema = new mongoose.Schema({
  metal: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const MetalPrice = mongoose.model('MetalPrice', metalPriceSchema);

export default MetalPrice;
