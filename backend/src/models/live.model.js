import mongoose from "mongoose";

const liveStreamSchema = new mongoose.Schema({
  link: {
    type: String,
    required: false, // It's optional, as the live stream might not always be available
    default: "", // Default value is an empty string, meaning no live stream link
  },
});

const LiveStream = mongoose.model("LiveStream", liveStreamSchema);

export default LiveStream;
