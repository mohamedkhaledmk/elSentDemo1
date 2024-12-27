import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { reset } from "../store/auth/authSlice";
import { getAllAuctions } from "../store/auction/auctionSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SingleAuction from "../components/SingleAuction";
import SearchLocationCategory from "../components/SearchLocationCategory";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import axios from "axios";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [auctionData, setAuctionData] = useState([]);

  const { auction, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auction
  );

  useEffect(() => {
    dispatch(getAllAuctions());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setAuctionData(auction);
    } else if (isError) {
      toast.error(message);
    }
  }, [auction]);

  // Pagination part
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(12);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = auctionData?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // State to track the current image index for each auction when hovering
  const [currentImageIndexes, setCurrentImageIndexes] = useState(
    auctionData.map(() => 0)
  );

  // Handle hover effect
  const handleMouseEnter = (index) => {
    const imagesArray = auctionData[index]?.images || [];
    if (imagesArray.length > 1) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        setCurrentImageIndexes((prevIndexes) => {
          const updatedIndexes = [...prevIndexes];
          updatedIndexes[index] = (currentIndex + 1) % imagesArray.length;
          currentIndex++;
          return updatedIndexes;
        });
      }, 1000);

      // Stop the image cycling on mouse leave
      const handleMouseLeave = () => {
        clearInterval(interval);
      };

      // Attach mouse leave handler
      document
        .getElementById(`auction-item-${index}`)
        .addEventListener("mouseleave", handleMouseLeave);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-start mb-5">
      <div className="flex items-center">
        <span className="flex absolute animate-ping rounded-full h-3 w-3 bg-color-warning"></span>
        <span className="relative flex rounded-full h-3 w-3 bg-color-warning"></span>
        <span>&nbsp;&nbsp;&nbsp;</span> {/* Adds 3 spaces */}
        <h2 className="flex text-2xl font-bold text-white">Live Auctions</h2>
        <div></div>
      </div>

      <div className="flex flex-col min-h-screen w-full bg-body-bg text-[#7386a8]">
        <div>
          <SearchLocationCategory />
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4 max-w-[1400px] mx-auto">
            {auctionData &&
              currentItems.map((item, index) => {
                const images = item?.images || [];
                const currentImageIndex = currentImageIndexes[index];
                const currentImage =
                  images[currentImageIndex] || images[0] || item.image;

                return (
                  <div
                    key={index}
                    id={`auction-item-${index}`}
                    onMouseEnter={() => handleMouseEnter(index)}
                    className="relative"
                  >
                    <SingleAuction
                      name={item?.name}
                      startingPrice={item?.startingPrice}
                      image={currentImage} // Show image based on the cycling index
                      endTime={item?.endTime}
                      startTime={item?.startTime}
                      id={item?._id}
                      status={item?.status}
                      sellerImage={item?.seller?.profilePicture}
                      sellerName={item?.seller?.fullName}
                      sellerId={item?.seller?._id}
                      bidLength={item?.bids?.length}
                      winnerFullName={item?.winner?.bidder?.fullName}
                      winnerProfilePicture={
                        item?.winner?.bidder?.profilePicture
                      }
                      winnerBidAmount={item?.winner?.bidAmount}
                      winnerBidTime={item?.winner?.bidTime}
                    />
                  </div>
                );
              })}
          </div>
        )}
        {auctionData && auctionData?.length !== 0 ? (
          <Pagination
            totalPosts={auctionData?.length}
            postsPerPage={itemsPerPage}
            paginate={paginate}
            currentPage={currentPage}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
