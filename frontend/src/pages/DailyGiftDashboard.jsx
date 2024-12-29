import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DailyGiftDashboard = () => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleUpload = async () => {
    if (!selectedFiles) {
      alert("Please select files to upload");
      return;
    }

    const formData = new FormData();
    Array.from(selectedFiles).forEach((file) => {
      formData.append("images", file);
    });

    try {
      setUploadStatus("Uploading...");
      const response = await axios.post(
        "http://localhost:8000/api/v1/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadStatus("Upload successful!");
      toast.success("Upload successful!");
      console.log(response.data);
    } catch (error) {
      setUploadStatus("Upload failed");
      toast.error("Upload failed");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 bg-theme-bg2 p-5 rounded-xl shadow-lg min-h-screen pt-20">
      <h2 className="text-3xl font-extrabold text-white">Upload Images</h2>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="text-white bg-black bg-opacity-50 p-3 rounded-lg cursor-pointer focus:outline-none"
      />
      <button
        onClick={handleUpload}
        className="px-6 py-2 bg-color-primary text-white rounded-lg hover:bg-color-secondary transition-all"
      >
        Upload
      </button>
      <p
        className={`text-body-text-color mt-2 ${uploadStatus ? "text-green-500" : "text-red-500"}`}
      >
        {uploadStatus}
      </p>
    </div>
  );
};

export default DailyGiftDashboard;
