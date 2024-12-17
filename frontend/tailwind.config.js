import { transform } from "framer-motion";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
        Barlow: ["Barlow", "sans-serif"],
      },
      screens: {
        vsm: "400px",
        mlg: { max: "1200px" },
      },
      colors: {
        "body-bg": "#151417", // Dark background
        "body-text-color": "#D6C5A3", // Light text for readability
        "heading-color": "#ECE4CA", // Lighter heading to create contrast
        "theme-color": "#917E62", // Key theme color (rich, earthy tone)
        "theme-bg": "#231E19", // Main theme background
        "theme-bg2": "#262321", // Slightly lighter variant for subtle separation
        "theme-bg-light": "#3F3328", // Background for sections with slight difference
        "theme-color-light": "#ECE4CA99", // Lightened color for subtle contrast
        "color-white": "#ECE4CA", // Off-white to avoid harsh contrast
        "color-dark": "#151417", // Main dark color for primary backgrounds
        "color-success": "#10B981", // Keeping this since it's a standard success color
        "color-primary": "#917E62", // Primary color to maintain consistency with theme
        "color-info": "#5E584E", // Used for info notifications (neutral, calm shade)
        "color-danger": "#FF7782", // Keeping this as-is (red for danger)
        "color-warning": "#B1A791", // Light warning color
        "color-secondary": "#D6C5A3", // Used for secondary texts
        hover: "#917E62", // Hover effect uses the primary color for a smooth experience
        "border-info-color": "#5E584E40", // Slightly transparent version for border
        "border-white-color": "#ECE4CA14", // Slight transparency of the light color
        "footer-bg": "#1D1C1F", // Footer background — darker than the body
        "footer-text-color": "#ECE4CA", // Footer text matches primary text color
    },    
      backgroundImage: {
        "hero-img": "url(./assets/bg.jpg)",
      },

      keyframes: {
        fadeinkey: {
          "0%": {
            transform: "scale(0)",
            visibility: "hidden",
            opacity: 0,
          },

          "100%": {
            transform: "scale(1)",
            visibility: "visible",
            opacity: 1,
          },
        },
        fadeoutkey: {
          "0%": {
            visibility: "visible",
            opacity: 1,
          },
          
          "100%": { visibility: "hidden", opacity: 0 },
        },
        floatkey: {
          "0,100%": {
            transform: "translate(0,0)",
          },
          
          "50%": {
            transform: "translate(0,10px)",
          },
        },
        counterspin: {
          to: {
            transform: "rotate(-360deg) ",
          },
        },
        clockspin: {
          to: {
            transform: "rotate(360deg) ",
          },
        },
        successkey: {
          "0%": {
            transform: "translate(0,100px)",
            visibility: "hidden",
            opacity: 0,
          },

          "100%": {
            transform: "translate(0,0)",
            visibility: "visible",
            opacity: 1,
          },
        },
        fadeinoutkey: {
          "0,100%": {  
            visibility: "visible",
            opacity: 1,
          },

          "50%": {                   
            visibility: "hidden",
            opacity: 0,
          },
        },
      },
      animation: {
        fadein: "fadeinkey 300ms ",
        fadeout: "fadeoutkey 300ms",
        float: "floatkey 3s ease-in-out infinite",
        counterspin: "counterspin 2s infinite",
        successpayment: "successkey 1s ease-in-out",
        fadeinout: "fadeinoutkey 1s ease-in-out infinite",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
      addVariant("inputs", "& input");
      addVariant("button", "& button");
      addVariant("select", "& select");
      addVariant("link", "& a");
    },
  ],
};
