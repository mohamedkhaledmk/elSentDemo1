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
import logo from "../assets/logo.png";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { notifications } = useSelector((state) => state.notification);
  const navigate = useNavigate();

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

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logoutHandle = () => {
    dispatch(logout());
    toast.success("Logout Successfully!");
    setSidebarOpen(false);
    dispatch(reset());
    navigate("/login");
  };

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
      <div className="flex items-center px-1 z-[1]">
        <Link to="/" className="no-underline">
          <img src={logo} alt="ElSent Logo" className="w-28 h-28 mx-auto" />
        </Link>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-[250px] bg-body-bg z-50 transition-transform duration-300 transform ${
          navbarOpen ? "translate-x-0" : "translate-x-full"
        } sm:hidden`}
      >
        <button
          onClick={() => setNavbarOpen(false)}
          className="absolute top-4 right-4 text-white"
        >
          <FaTimes size={25} />
        </button>
        <nav className="flex flex-col items-center mt-16">
          <Link
            to="/"
            className="text-white text-lg py-2 hover:text-color-primary"
            onClick={() => setNavbarOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/Dashboard"
            className="text-white text-lg py-2 hover:text-color-primary"
            onClick={() => setNavbarOpen(false)}
          >
            Live Auctions
          </Link>
          <Link
            to="/about-us"
            className="text-white text-lg py-2 hover:text-color-primary"
            onClick={() => setNavbarOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact-us"
            className="text-white text-lg py-2 hover:text-color-primary"
            onClick={() => setNavbarOpen(false)}
          >
            Contact
          </Link>
          <Link
            to="/privacy-policy"
            className="text-white text-lg py-2 hover:text-color-primary"
            onClick={() => setNavbarOpen(false)}
          >
            Privacy Policy
          </Link>
        </nav>
      </div>

      <div className="hidden sm:flex">
        <Link
          to="/"
          className="text-white font-Roboto text-lg mx-3 hover:text-color-primary"
        >
          Home
        </Link>
        <Link
          to="/Dashboard"
          className="text-white font-Roboto text-lg mx-3 hover:text-color-primary"
        >
          Live Auctions
        </Link>
        <Link
          to="/about-us"
          className="text-white font-Roboto text-lg mx-3 hover:text-color-primary"
        >
          About
        </Link>
        <Link
          to="/contact-us"
          className="text-white font-Roboto text-lg mx-3 hover:text-color-primary"
        >
          Contact
        </Link>
        <Link
          to="/privacy-policy"
          className="text-white font-Roboto text-lg mx-3 hover:text-color-primary"
        >
          Privacy Policy
        </Link>
      </div>

      <div className="flex items-center cursor-pointer z-[1]">
      <Link
          to="/download-app"
          className=" text-white font-Roboto text-lg mx-3 hover:text-color-primary transition-all tracking-wide"
        >
          Download <br />
            Our App
        </Link>
        {user ? (
          <div className="flex items-center">
            <Link
              to="/user-profile/cart"
              className="text-white font-Roboto text-lg mx-3"
            >
              <BsCart3 className="text-white hover:text-theme-color transition-all" />
            </Link>
            <img
              src={user?.profilePicture}
              alt="user image"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            />
            {sidebarOpen && (
              <div className="absolute top-16 right-4 bg-color-dark shadow-lg rounded-md w-40 z-50">
                <Link
                  to="/user-profile/profile"
                  className="block px-4 py-2 text-[#797D62] hover:bg-[#E5C59E] transition-all"
                >
                  Profile
                </Link>
                <Link
                  to="/user-profile/settings"
                  className="block px-4 py-2 text-[#797D62] hover:bg-[#E5C59E] transition-all"
                >
                  Settings
                </Link>
                <button
                  onClick={logoutHandle}
                  className="block w-full text-left px-4 py-2 text-[#797D62] hover:bg-[#E5C59E] transition-all"
                >
                  Logout
                </button>
              </div>
            )}
            <Link to="/user-profile/notifications" className="relative">
              {unReadNotifications.length > 0 && (
                <span className="absolute right-0 top-0 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                  {unReadNotifications.length}
                </span>
              )}
              <IoIosNotificationsOutline size={30} />
            </Link>
          </div>
        ) : (
          <>
            <Link
              to="/register"
              className="bg-primary text-white py-1 px-3 rounded-md mx-2"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="bg-secondary text-white py-1 px-3 rounded-md mx-2"
            >
              Sign In
            </Link>
          </>
        )}
        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="sm:hidden text-white"
        >
          <FaBars size={25} />
        </button>
      </div>
    </div>
  );
};

export default Header;
