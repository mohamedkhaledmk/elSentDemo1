import { Link } from "react-router-dom";
import { RiFindReplaceLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import heroImg1 from "../../assets/heroimg1.png";
import heroImg2 from "../../assets/heroimg2.png";
import heroImg3 from "../../assets/heroimg3.png";
const HeroHome = () => {
  const [activeImage, setActiveImage] = useState(0);
  
  // Hero images array with imported images
  const heroImages = [heroImg1, heroImg2, heroImg3];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % 3); // Cycle through 3 images
    }, 2000); // Change every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="lg:h-[85vh] py-20 p-5 lg:px-12 flex items-center justify-center flex-wrap lg:flex-nowrap gap-5 text-white">
        {/* Vector Backgrounds */}
        <div className="block overflow-hidden relative">
          <div className="w-[300px] h-[300px] bg-[#C19A7D] rounded-full blur-[150px] absolute left-[-50px] top-[-80px]"></div>
          <div className="w-[200px] h-[200px] bg-[#C0B298] rounded-full blur-[150px] absolute left-[45%] top-[100px]"></div>
          <div className="w-[250px] h-[250px] bg-[#C19A7D] rounded-full blur-[150px] absolute right-[50px] bottom-[80%] lg:bottom-[70%]"></div>
        </div>

        {/* Hero Content */}
        <div className="w-full flex flex-col gap-4 z-[1]">
          <h3 className="tracking-wider">Discover and Bid on Exquisite Gold & Jewelry</h3>
          <h1 className="text-5xl font-bold">
            Experience the Elegance of Real-Time Auctions
          </h1>
          <p>
            Uncover a dazzling collection of rare gold and fine jewelry. Our live
            auctions bring the excitement of discovering and bidding on exquisite
            treasures right to your fingertips. Explore unique listings and claim
            timeless pieces that radiate luxury and elegance.
          </p>
          <div className="flex gap-4">
            <Link
              className="hover:scale-105 flex border border-border-info-color px-5 py-3 mt-2 rounded-xl text-white cursor-pointer font-bold tracking-wide hover:bg-hover transition-all duration-200 w-fit"
              to="/dashboard"
            >
              <div className="flex items-center gap-2">
                <RiFindReplaceLine />
                <span>Explore More</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full lg:p-20 animate-float">
          <img
            src={heroImages[activeImage]}  // Dynamically change the hero image
            alt="Hero-img"
            className="hero-image"
            style={{
              borderRadius: "100px", // Optional: round the corners
              transition: "opacity 1s ease-in-out", // Smooth fade transition
            }}
          />
        </div>
      </div>
    </>
  );
};

export default HeroHome;
