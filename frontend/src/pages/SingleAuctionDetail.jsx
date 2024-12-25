import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSingleAuctionById, reset } from "../store/auction/auctionSlice";
import CountDownTimer from "../components/CountDownTimer";
import BidCard from "../components/BidCard";
import { placeABid } from "../store/bid/bidSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendNewBidNotification } from "../store/notification/notificationSlice";
import socket from "../socket";
import { getAllBidsForAuction } from "../store/bid/bidSlice";
import Loading from "../components/Loading";
import LiveHome from "../components/home/LiveHome";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Example using react-icons

const SingleAuctionDetail = ({ noPadding }) => {
  const [newBidAmount, setNewBidAmount] = useState("");
  const logInUser = JSON.parse(localStorage.getItem("user"));
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("description");
  const params = useParams();
  const dispatch = useDispatch();
  const { auction } = useSelector((state) => state.auction);
  const { bids } = useSelector((state) => state.bid);
  const [auctionStarted, setAuctionStarted] = useState(false);
  const [singleAuctionData, setSingleAuctionData] = useState();
  const [auctionWinnerDetailData, setAuctionWinnerDetailData] = useState();
  const [bidsData, setBidsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [singleAuction, setSingleAuction] = useState(
    auction ? auction.find((item) => item._id === params?.id) : auction[0]
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const auctionStartTime = new Date(singleAuction?.startTime).getTime();
      const auctionEndTime = new Date(singleAuction?.endTime).getTime();

      if (
        currentTime >= auctionStartTime &&
        currentTime <= auctionEndTime &&
        !auctionStarted
      ) {
        setAuctionStarted(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [singleAuction?.startTime]);

  socket.on("winnerSelected", async (data) => {
    setAuctionStarted(false);
    setAuctionWinnerDetailData(data);
  });

  const handleWinner = () => {
    socket.emit("selectWinner", params?.id);
  };
  const confirmBid = () => {
    console.log(user, "user");
    const { fullName, email, phone, address } = user;
    if (!fullName || !email || !phone || !address) {
      toast.error("Please fill all the your profile fields first!");
      return false;
    } else {
      toast.info(
        "Your bid is ready. click on the confirm bid button to place your bid"
      );
    }
  };
  socket.on("newBidData", async (data) => {
    setBidsData([
      {
        _id: new Date().getTime(),
        bidder: {
          fullName: data.fullName,
          profilePicture: data.profilePicture,
        },
        bidAmount: data.bidAmount,
        bidTime: data.bidTime,
        auction: data.auctionId,
      },
      ...bidsData,
    ]);

    setSingleAuctionData((prevState) => ({
      ...prevState,
      startingPrice: data.bidAmount,
    }));
  });

  useEffect(() => {
    setBidsData(bids);
    setSingleAuctionData(singleAuction);
  }, [bids, singleAuction]);

  useEffect(() => {
    socket.on("connect", () => {});
    socket.emit("joinAuction", logInUser?._id);
    socket.on("newUserJoined", (data) => {});
  }, []);

  const placeBidHandle = async (e) => {
    e.preventDefault();
    if (user?.paymentVerified === false) {
      toast.info(
        "Please verify your payment method to place a bid. Go to settings..."
      );
    }
    let bidData = {
      id: params.id,
      amount: Math.floor(newBidAmount),
    };
    if (Math.floor(newBidAmount) <= singleAuctionData?.startingPrice) {
      toast.info("Bid amount should be greater than the current bid");
    } else if (singleAuction?.endTime < new Date().getTime() / 1000) {
      toast.info("Auction time is over");
    } else {
      dispatch(placeABid(bidData));
      setNewBidAmount("");
      socket.emit("newBid", {
        profilePicture: logInUser?.profilePicture,
        fullName: logInUser?.fullName,
        bidAmount: Math.floor(newBidAmount),
        bidTime: new Date().getTime(),
        auctionId: params.id,
      });

      await socket.emit("sendNewBidNotification", {
        auctionId: params.id,
        type: "BID_PLACED",
        newBidAmount: newBidAmount,
        fullName: logInUser?.fullName,
        id: logInUser?._id,
      });
      setActiveTab("bids");
      dispatch(
        sendNewBidNotification({
          auctionId: params.id,
          type: "BID_PLACED",
          newBidAmount: newBidAmount,
        })
      );
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex + 1 < singleAuction?.images?.length ? prevIndex + 1 : 0
    );
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : singleAuction?.images?.length - 1
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div
        className={`flex place-content-between py-10 px-5 lg:py-20 lg:px-10 items-start gap-7 flex-wrap md:flex-nowrap ${noPadding ? "lg:py-0 px-0" : "p-4"}`}
        id="item01"
      >
        <div className="relative rounded-xl md:max-w-[45%] w-full">
          <img
            className="rounded-xl w-full"
            src={singleAuction?.images[currentImageIndex]}
            alt={`Product image ${currentImageIndex + 1}`}
          />
          <button
            className="absolute top-1/2 left-2 text-white bg-black bg-opacity-50 p-2 rounded-full"
            onClick={handlePreviousImage}
          >
            <FaArrowLeft />
          </button>
          <button
            className="absolute top-1/2 right-2 text-white bg-black bg-opacity-50 p-2 rounded-full"
            onClick={handleNextImage}
          >
            <FaArrowRight />{" "}
          </button>
        </div>
        <div className="w-full flex gap-4 flex-col">
          <div>
            <h2 className="text-3xl font-extrabold text-white">
              {singleAuction?.name}
            </h2>
            <div className="pt-4 flex flex-row gap-4 flex-wrap text-body-text-color capitalize">
              <a
                href="#"
                className="px-4 py-1 border rounded-full hover:bg-color-primary border-border-info-color hover:text-white transition-all"
              >
                {singleAuction?.category?.name}
              </a>
              <a
                href="#"
                className="px-4 py-1 border rounded-full hover:bg-color-primary border-border-info-color hover:text-white transition-all"
              >
                {singleAuction?.location?.name}
              </a>
            </div>
            <div className="pt-4 border-t border-border-info-color">
              <h3 className="text-heading-color font-medium">
                Product Specifications
              </h3>
              <ul className="text-body-text-color">
                {singleAuction.workManShipFee && (
                  <li>Workmanship Fee: {singleAuction.workManShipFee} %</li>
                )}
                {singleAuction.length && (
                  <li>Length: {singleAuction.length} cm</li>
                )}
                {singleAuction.width && (
                  <li>Width: {singleAuction.width} cm</li>
                )}
                {singleAuction.height && (
                  <li>Height: {singleAuction.height} cm</li>
                )}
                {singleAuction.weight && (
                  <li>Weight: {singleAuction.weight} kg</li>
                )}
                {singleAuction.color && <li>Color: {singleAuction.color}</li>}
              </ul>
            </div>
            <div className="pt-4 border-t border-border-info-color">
              <div className="flex gap-4 pt-4 font-bold text-white">
                <button
                  className={`px-5 py-2 rounded-xl ${
                    activeTab === "description"
                      ? "bg-color-primary"
                      : "bg-theme-bg2 text-body-text-color"
                  }`}
                  onClick={() => setActiveTab("description")}
                >
                  Details
                </button>
                <button
                  className={`px-5 py-2 rounded-xl ${
                    activeTab === "bids"
                      ? "bg-color-primary"
                      : "bg-theme-bg2 text-body-text-color"
                  }`}
                  onClick={() => setActiveTab("bids")}
                >
                  Bids
                </button>
              </div>
            </div>
            <div>
              <div
                id="description"
                className={`pt-4 border-t border-border-info-color ${
                  activeTab === "description" ? "block" : "hidden"
                }`}
              >
                <h3 className="text-heading-color font-medium">Description</h3>
                <p className="text-body-text-color">
                  {singleAuction?.description}
                </p>
              </div>
              <div
                id="bids"
                className={`pt-4 border-t border-border-info-color max-h-[250px] overflow-y-auto ${
                  activeTab === "bids" ? "block" : "hidden"
                } no-scrollbar`}
              >
                {singleAuction?.bids?.length > 0 || bidsData.length > 0 ? (
                  bidsData?.map((bid) => <BidCard key={bid._id} bid={bid} />)
                ) : (
                  <h1 className="text-white">No bids yet</h1>
                )}
              </div>
            </div>
          </div>
          <div className="text-heading-color capitalize"></div>
          <div className="flex flex-col gap-4 pt-4 border-t border-border-info-color">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <h3 className="text-heading-color font-medium">
                  {singleAuction?.bids?.length > 0
                    ? "Current Bid"
                    : "Starting Price"}
                </h3>
                <p className="text-body-text-color">
                  ${singleAuctionData?.startingPrice}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-heading-color font-medium">Time</h3>
                <p className="text-body-text-color">
                  <CountDownTimer
                    startTime={singleAuction?.startTime}
                    endTime={singleAuction?.endTime}
                    id={singleAuction?._id}
                    Winner={handleWinner}
                  />
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 pt-4 border-t border-border-info-color">
              {singleAuction?.status === "over" || auctionWinnerDetailData ? (
                bidsData.length > 0 ? (
                  <div>
                    <h1 className="font-bold text-white">Winner</h1>
                    <div className="flex sm:gap-10 items-center border mt-2 justify-between md:w-[80%] py-1 px-2 md:px-5 border-theme-bg-light rounded-full">
                      <div className="flex gap-4 items-center text-white">
                        <img
                          src={
                            auctionWinnerDetailData?.bidder?.profilePicture ||
                            singleAuction?.winner?.bidder?.profilePicture
                          }
                          alt="bidder profilePicture"
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex flex-col">
                          <span className="font-semibold">
                            {auctionWinnerDetailData?.bidder?.fullName ||
                              singleAuction?.winner?.bidder?.fullName}
                          </span>
                          <span className="text-xs text-body-text-color">
                            {new Date(
                              auctionWinnerDetailData?.bidTime ||
                                singleAuction?.winner?.bidTime
                            ).toLocaleDateString()}{" "}
                            {""}
                            {`${new Date(
                              auctionWinnerDetailData?.bidTime ||
                                singleAuction?.winner?.bidTime
                            ).toLocaleTimeString()}`}
                          </span>
                        </div>
                      </div>
                      <div className="text-white">
                        Bid Amount : $
                        {auctionWinnerDetailData?.bidAmount ||
                          singleAuction?.winner?.bidAmount}
                      </div>
                    </div>
                  </div>
                ) : (
                  <h1 className="text-white">No bids</h1>
                )
              ) : (
                auctionStarted && (
                  <form
                    className="flex justify-between items-center flex-wrap gap-4"
                    onSubmit={placeBidHandle}
                  >
                    <div className="flex flex-col gap-4 pt-4 border-t border-border-info-color">
                      {auctionStarted && (
                        <form
                          className="flex justify-between items-center gap-4"
                          onSubmit={(e) => e.preventDefault()}
                        >
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              className="outline-none text-slate-300 px-3 py-4 rounded-xl bg-theme-bg2 border border-border-info-color focus:border-theme-color transition-all"
                              placeholder="Enter your bid"
                              value={newBidAmount}
                              readOnly
                              required
                            />
                            <div className="flex flex-col">
                              <button
                                type="button"
                                className="bg-theme-bg2 hover:bg-theme-color text-white px-2 py-1 rounded-t-md"
                                onClick={() =>
                                  setNewBidAmount((prev) =>
                                    prev
                                      ? +prev +
                                        (singleAuction.incrementPrice
                                          ? singleAuction?.incrementPrice
                                          : 500)
                                      : singleAuction?.startingPrice
                                  )
                                }
                              >
                                ▲
                              </button>
                              <button
                                type="button"
                                className="bg-theme-bg2 hover:bg-theme-color text-white px-2 py-1 rounded-b-md"
                                onClick={() =>
                                  setNewBidAmount((prev) =>
                                    Math.max(
                                      prev
                                        ? +prev - 500
                                        : singleAuction?.startingPrice,
                                      singleAuction?.startingPrice
                                    )
                                  )
                                }
                              >
                                ▼
                              </button>
                            </div>
                          </div>
                          {logInUser ? (
                            user?.paymentVerified ? (
                              <div className="ml-auto">
                                <button
                                  type="button"
                                  className="bg-color-primary py-2 px-4 rounded-lg text-white"
                                  onClick={() => confirmBid()}
                                >
                                  Confirm Bid
                                </button>
                              </div>
                            ) : (
                              <div className="ml-auto">
                                <button
                                  type="button"
                                  className="bg-color-primary py-2 px-4 rounded-lg text-white"
                                  onClick={() => confirmBid()}
                                >
                                  Confirm Bid
                                </button>
                              </div>
                            )
                          ) : (
                            <Link
                              to="/login"
                              className="bg-color-primary py-2 px-4 rounded-lg cursor-pointer text-white"
                            >
                              Place Bid
                            </Link>
                          )}
                        </form>
                      )}
                    </div>
                  </form>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleAuctionDetail;
