// AdminPanel.js

import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPanel = () => {
  const [link, setLink] = useState("");

  const updateLink = async () => {
    console.log("ss", link);
    try {
      await axios.put("http://localhost:8000/api/v1/live", { link });
      toast.success("Live stream link updated successfully!");
      setLink(""); // Clear the input field after success
    } catch (error) {
      console.error("Error updating live link:", error);
      toast.error("Failed to update the live stream link. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4 p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
      <input
        type="text"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Enter live stream link"
        className="border p-2 rounded w-full max-w-md"
      />
      <button
        onClick={updateLink}
        className="bg-color-secondary text-white p-2 rounded hover:bg-[#917E62]"
      >
        Update Link
      </button>
      {/* Toastify Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminPanel;
