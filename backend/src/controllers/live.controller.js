import axios from "axios";
import LiveStream from "../models/live.model.js";
const getLink = async (req, res) => {
  try {
    const link = await LiveStream.findById("6768287d842c5516e7889f64");
    res.status(200).json({
      success: true,
      message: "Link fetched successfully",
      link: link,
    });
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({
      success: false,
      message: error.response
        ? error.response.data.message
        : "Error fetching link",
    });
  }
};

const addLink = async (req, res) => {
  try {
    const link = await LiveStream.create(req.body);
    res.status(200).json({
      success: true,
      message: "Link added successfully",
      link: link,
    });
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({
      success: false,
      message: error.response
        ? error.response.data.message
        : "Error adding link",
    });
  }
};

const updateLink = async (req, res) => {
  try {
    const link = await LiveStream.findOneAndUpdate(
      { _id: `6768287d842c5516e7889f64` },
      { link: req.body.link },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Updated link",
      data: { link: link.data },
    });
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({
      success: false,
      message: error.response
        ? error.response.data.message
        : "Error updating link",
    });
  }
};

export { getLink, addLink, updateLink };
