import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const DailyGifts = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "https://el-sent-demo1-backend.vercel.app//api/v1/images"
        );
        // Ensure the response contains valid data
        if (Array.isArray(response.data)) {
          setImages(response.data);
        } else {
          //console.error("Invalid API response:", response.data);
        }
      } catch (error) {
        //console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Auto-scroll functionality
  useEffect(() => {
    if (images.length === 0) return; // Don't start auto-scroll if there are no images

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div
      className="slider-container"
      style={{ position: "relative", width: "800px", margin: "0 auto" }}
    >
      <h2 className="text-2xl font-bold text-white text-center mb-5">
        Daily Gifts
      </h2>
      {images.length > 0 ? (
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            style={{
              position: "absolute",
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
            }}
            onClick={handlePrev}
          >
            <FaArrowLeft />
          </button>
          <img
            key={images[currentIndex]?._id}
            src={images[currentIndex]?.url}
            alt={`Jewelry ${currentIndex + 1}`}
            style={{ width: "100%", height: "auto" }}
          />
          <button
            style={{
              position: "absolute",
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
            }}
            onClick={handleNext}
          >
            <FaArrowRight />
          </button>
        </div>
      ) : (
        <p>Loading images...</p>
      )}
    </div>
  );
};

export default DailyGifts;
