import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../store/auth/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BsCart3 } from "react-icons/bs";
import { FaBars, FaTimes } from "react-icons/fa";
import socket from "../socket";
import { getNotificationForUser } from "../store/notification/notificationSlice";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false); // To track scroll state

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { notifications } = useSelector((state) => state.notification);
  let navigate = useNavigate();

  const logInUser = JSON.parse(localStorage.getItem("user"));

  const unReadNotifications = notifications.filter(
    (notification) => notification.isRead === false
  );

  useEffect(() => {
    if (logInUser) {
      dispatch(getNotificationForUser());
    }
    socket.on("newBidNotification", (data) => {
      socket.emit("joinAuction", logInUser?._id);
      dispatch(getNotificationForUser());
    });
  }, []);

  // Scroll event to detect when the user scrolls
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolling(true); // Activate blur effect when scrolled
    } else {
      setScrolling(false); // Remove blur when at the top
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll); // Add event listener
    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
    };
  }, []);

  const logoutHandle = () => {
    dispatch(logout());
    toast.success("Logout Successfully!");
    setSidebarOpen(false);
    dispatch(reset());
    navigate("/login");
  };

  return (
    <div
      className={`sticky top-0 z-50 flex justify-between items-center px-2 sm:px-14 py-2 border-b-4 border-heading-color transition-all duration-300 ${
        scrolling ? "backdrop-blur-lg bg-dark shadow-md" : "bg-body-bg"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center px-1 z-[1]">
        <Link to="/dashboard" className="no-underline">
          <h1 className="text-3xl font-bold text-white font-Roboto">
            <span className="uppercase text-theme-color">E</span>l
            <span className="uppercase text-theme-color">S</span>ent
          </h1>
        </Link>
      </div>

      {/* Links (Home, Contact, About) */}
      <div className="hidden sm:block">
  <Link
    to="/"
    className="text-white font-Roboto text-lg mx-3 hover:text-color-primary transition-all tracking-wide"
  >
    Home
  </Link>
  <Link
    to="/privacy-policy"
    className="text-white font-Roboto text-lg mx-3 hover:text-color-primary transition-all tracking-wide"
  >
    Live Auctions
  </Link>
 
  <Link
    to="/about-us"
    className="text-white font-Roboto text-lg mx-3 hover:text-color-primary transition-all tracking-wide"
  >
    About
  </Link>
  <Link
    to="/contact-us"
    className="text-white font-Roboto text-lg mx-3 hover:text-color-primary transition-all tracking-wide"
  >
    Contact
  </Link>
  <Link
    to="/privacy-policy"
    className="text-white font-Roboto text-lg mx-3 hover:text-color-primary transition-all tracking-wide"
  >
    Privacy Policy
  </Link>
</div>


      {/* User Profile and Notifications */}
      <div className="flex items-center cursor-pointer z-[1]">
        {user ? (
          <div className="flex justify-center items-center">
            <Link
              to="/user-profile/cart"
              className="text-white font-Roboto text-lg mx-3"
            >
              <BsCart3 className="text-white hover:text-theme-color transition-all" />
            </Link>
            <img
              src={user?.profilePicture}
              key={user.profilePicture}
              alt="user image"
              className="w-10 h-10 rounded-full order-2 cursor-pointer active:scale-[0.95] transition-all"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            />
            <Link to="/user-profile/notifications" className="mr-2 relative">
              {unReadNotifications.length > 0 ? (
                <span className="absolute right-0 top-0 w-[18px] h-[18px] flex items-center justify-center bg-theme-color rounded-full text-white text-xs font-bold">
                  {unReadNotifications.length}
                </span>
              ) : null}
              <IoIosNotificationsOutline
                size={37}
                className="text-white text-xl cursor-pointer bg-theme-bg hover:text-theme-color rounded-full p-2 transition-all"
              />
            </Link>
            <Link
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="text-white font-Roboto sm:hidden text-lg mx-3 order-3"
            >
              {navbarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </Link>
          </div>
        ) : (
          <>
          <Link
              to="/register"
              className="bg-color no-underline font-Roboto text-base hover:text-hover transition-all duration-150 text-white py-1 sm:py-2 sm:px-3 px-2 rounded-md text-md font-semibold"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="bg-color-secondary no-underline font-Roboto text-base hover:bg-hover transition-all duration-150 text-white py-1 sm:py-2 sm:px-3 px-2 rounded-md text-md font-semibold"
            >
              Sign In
            </Link>
            <Link
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="text-white font-Roboto sm:hidden text-lg mx-3 order-3 z-50"
            >
              {navbarOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
            </Link>
          </>
        )}
      </div>

      {/* Sidebar for User */}
      {user && sidebarOpen ? (
        <div
          className={`${
            sidebarOpen ? "animate-fadein" : "hidden"
          } rounded-xl origin-top-right overflow-hidden absolute right-12 top-16 mt-[4px] bg-body-bg z-50 w-[250px]`}
        >
          <nav className="pt-2 [&_a]:transition-all [&_a]:duration-100">
            <Link
              to="/user-profile/profile"
              className="block no-underline text-white font-Roboto text-lg py-2 px-7 hover:bg-theme-bg-light"
              onClick={() => setSidebarOpen(false)}
            >
              Profile
            </Link>
            <Link
              to={
                user.userType === "seller"
                  ? "/user-profile/manage-items"
                  : "/user-profile/bids-items"
              }
              className="block no-underline text-white font-Roboto text-lg py-2 px-7 hover:bg-theme-bg-light"
              onClick={() => setSidebarOpen(false)}
            >
              {user.userType === "seller" ? "Manage Items" : "Bids Items"}
            </Link>
            <Link
              to="/user-profile/account-settings"
              className="block no-underline text-white font-Roboto text-lg py-2 px-7 hover:bg-theme-bg-light"
              onClick={() => setSidebarOpen(false)}
            >
              Account Setting
            </Link>
            <Link
              onClick={() => {
                logoutHandle();
                setSidebarOpen(false);
              }}
              className="block no-underline text-white font-Roboto text-lg py-2 px-7 hover:bg-theme-bg-light"
            >
              Logout
            </Link>
          </nav>
        </div>
      ) : null}

      {/* Navbar for Mobile */}
      {navbarOpen && (
        <ul className="flex sm:hidden flex-col justify-center items-center absolute top-16 left-0 w-full h-screen bg-gradient-to-b from-theme-bg2 to-theme-bg text-body-text-color z-10 [&_li]:flex [&_li]:w-full link:w-full link:px-4 link:py-6 hover:link:bg-theme-bg2 text-center">
          <li className="cursor-pointer capitalize text-4xl">
            <Link to="/" onClick={() => setNavbarOpen(!navbarOpen)}>
              Home
            </Link>
          </li>
          <li className="cursor-pointer capitalize text-4xl">
            <Link to="/contact-us" onClick={() => setNavbarOpen(!navbarOpen)}>
              Contact
            </Link>
          </li>
          <li className="cursor-pointer capitalize text-4xl">
            <Link to="/about-us" onClick={() => setNavbarOpen(!navbarOpen)}>
              About
            </Link>
          </li>
          <li className="cursor-pointer capitalize text-4xl">
            {user && (
              <Link to="/user-profile/cart" onClick={() => setNavbarOpen(!navbarOpen)}>
                Cart
              </Link>
            )}
          </li>
        </ul>
      )}
    </div>
  );
};

export default Header;
