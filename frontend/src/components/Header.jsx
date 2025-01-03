import { useState, useEffect, useRef } from "react";

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

import logo from "../assets/logo.png";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [navbarOpen, setNavbarOpen] = useState(false);

  const [scrolling, setScrolling] = useState(false); // To track scroll state

  const sidebarRef = useRef(null); // Ref for the sidebar

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

  // Handle click outside to close the sidebar
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setSidebarOpen(false); // Close the sidebar when clicking outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside); // Listen for clicks
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Clean up the listener
    };
  }, []);

  // Dynamically add Google Translate Script using a different approach
  useEffect(() => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script");

      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";

      script.async = true;

      script.onload = () => {
        window.googleTranslateElementInit = () => {
          new window.google.translate.TranslateElement(
            { pageLanguage: "en" },
            "google-translate-element"
          );
        };
      };

      document.body.appendChild(script);

      // Cleanup script on component unmount
      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  return (
    <div
      className={`sticky top-0 z-50 flex justify-between items-center px-2 sm:px-14 py-2 border-b-4 border-heading-color transition-all duration-300 ${
        scrolling ? "backdrop-blur-lg bg-dark shadow-md" : "bg-body-bg"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center px-1 z-[1]">
        <Link to="/" className="no-underline">
          <img src={logo} alt="ElSent Logo" className="w-28 h-28 mx-auto" />
        </Link>
      </div>

      {/* Links (Home, Contact, About) */}
      <div className={`sm:flex hidden`}>
        <Link
          to="/"
          className="text-white font-Roboto text-lg mx-3 hover:text-color-primary transition-all tracking-wide"
        >
          Home
        </Link>
        <Link
          to="/Dashboard"
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

      {/* Mobile Navigation Menu */}
      {navbarOpen && (
        <div className="absolute top-full left-0 w-full bg-dark flex flex-col items-center shadow-md sm:hidden z-[1000]">
          <Link
            to="/"
            className="text-white font-Roboto text-lg py-2 w-full text-center hover:text-color-primary transition-all tracking-wide"
            onClick={() => setNavbarOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/Dashboard"
            className="text-white font-Roboto text-lg py-2 w-full text-center hover:text-color-primary transition-all tracking-wide"
            onClick={() => setNavbarOpen(false)}
          >
            Live Auctions
          </Link>
          <Link
            to="/about-us"
            className="text-white font-Roboto text-lg py-2 w-full text-center hover:text-color-primary transition-all tracking-wide"
            onClick={() => setNavbarOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact-us"
            className="text-white font-Roboto text-lg py-2 w-full text-center hover:text-color-primary transition-all tracking-wide"
            onClick={() => setNavbarOpen(false)}
          >
            Contact
          </Link>
          <Link
            to="/privacy-policy"
            className="text-white font-Roboto text-lg py-2 w-full text-center hover:text-color-primary transition-all tracking-wide"
            onClick={() => setNavbarOpen(false)}
          >
            Privacy Policy
          </Link>
        </div>
      )}

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

            {/* Sidebar */}
            {sidebarOpen && (
              <div
                ref={sidebarRef} // Add ref here
                className="absolute top-24 right-4 bg-color-dark shadow-lg rounded-md w-40 z-50"
              >
                <Link
                  to="/user-profile/profile"
                  className="block px-4 py-2 text-[#797D62] hover:bg-[#E5C59E] transition-all"
                >
                  Profile
                </Link>
                <button
                  onClick={logoutHandle}
                  className="block w-full text-left px-4 py-2 text-[#797D62] hover:bg-[#E5C59E] transition-all"
                >
                  Logout
                </button>
              </div>
            )}

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
            <div id="google-translate-element"></div>
            <br />
            <Link
              to="/download-app"
              className=" bg-color-secondary no-underline font-Roboto text-base hover:bg-hover transition-all duration-150 text-white py-1 sm:py-2 sm:px-3 px-2 rounded-md text-md font-semibold"
            >
              Download Our App
            </Link>
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
    </div>
  );
};

export default Header;
