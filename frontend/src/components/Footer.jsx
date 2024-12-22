import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
const Footer = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <footer className="absolute bottom-150 bg-theme-bg shadow w-full flex-shrink-0">
      <div className="lg:w-[80%] mx-auto p-4 md:py-8 flex flex-col justify-between h-full">
        <div className="sm:flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 no-underline"
          >
            <img 
              src={logo} 
              alt="ElSent Logo" 
              className="w-28 h-28 mx-auto" 
            />
          </Link>
          <ul className="flex flex-wrap items-center text-sm font-medium text-white list-none">
            <li>
              <Link
                to="/about-us"
                className=" me-4 md:me-6 text-white no-underline hover:text-theme-color"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                className=" me-4 md:me-6 text-white no-underline hover:text-theme-color"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/contact-us"
                className=" text-white no-underline hover:text-theme-color"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-border-info-color sm:mx-auto lg:my-8" />
        <div className=" font-Roboto flex justify-center text-white items-center text-sm sm:text-center">
          © {new Date().getFullYear()}
          <Link to="/" className=" ml-1 no-underline">
            <p className="text-sm font-bold text-theme-color font-Roboto">
              <span className="uppercase text-theme-color">MZ</span>
              <span className="uppercase text-theme-color">B</span>id
            </p>
          </Link>
          . All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
