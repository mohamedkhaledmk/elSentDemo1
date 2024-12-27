import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const DailyGifts = () => {
  const images = [
    "https://via.placeholder.com/800x400.png?text=Jewelry+1",
    "https://via.placeholder.com/800x400.png?text=Jewelry+2",
    "https://via.placeholder.com/800x400.png?text=Jewelry+3",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <div className="slider-container" style={{ position: 'relative', width: '800px', margin: '0 auto' }}>
      <h2>Daily Gifts</h2>
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <button
          style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)' }}
          onClick={handlePrev}
        >
          <FaArrowLeft />
        </button>
        <img
          src={images[currentIndex]}
          alt={`Jewelry ${currentIndex + 1}`}
          style={{ width: '100%', height: 'auto' }}
        />
        <button
          style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}
          onClick={handleNext}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default DailyGifts;
