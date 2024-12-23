import React from "react";
import { Link } from "react-router-dom";
import ppImage from "../assets/ppImg.jpg"; 

const Application = () => {
  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      width: "100%", // Ensure the container takes the full width
      padding: "20px",
      lineHeight: "1.6",
      textAlign: "left", // Align everything to the left
    },
    heading: {
      fontSize: "2rem",
      marginBottom: "20px",
      color: "#ECE4CA", // Tailwind gray-800
      textAlign: "left", // Ensure heading is aligned to the left
    },
    section: {
      marginBottom: "30px",
    },
    subheading: {
      fontSize: "1.5rem",
      marginBottom: "15px",
      color: "#D6C5A3", // Tailwind gray-600
    },
    imageWrapper: {
      marginBottom: "15px",
    },
    image: {
      width: "100%", // Full width of the container
      maxWidth: "800px", // Optional: Set a max width for large screens
      height: "auto",
      borderRadius: "8px",
      border: "1.5px solid #d1d5db",
    },
    text: {
      fontSize: "2rem",
      color: "#D6C5A3", // Tailwind gray-500
    },
    list: {
      paddingLeft: "20px",
      color: "#D6C5A3", // Tailwind gray-500
    },
    listItem: {
      marginBottom: "10px",
    },
  };

  return (
    <main style={styles.container}>
      <div>
        <h1 style={styles.heading} className="font-bold text-3xl">Download Our App</h1>
        <br/>
      </div>

      <article style={styles.section}>
        <section>
          <h2 style={styles.subheading}>:For iPhone or iPad (Safari)</h2>
          <br/>
          <figure>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                1.Open Safari and navigate to the website you'd like to add to the home screen. Tap the share button (up arrow within a square) in the toolbar.
              </li>
              <br/>
              <div style={styles.imageWrapper}>
                <img
                  style={styles.image}
                  src="/src/assets/ios1.jpg"
                  alt="iOS Add to Home Screen"
                />
                <br/>
                <br/>
              </div>
              <li style={styles.listItem}>
                2.Scroll through the share sheet and tap "Add to Home Screen." If you don't see this option, it can be added from the "Edit Actions" option at the bottom of the share sheet.
              </li>
              <br/>
              <div style={styles.imageWrapper}>
                <img
                  style={styles.image}
                  src="/src/assets/ios2.jpg"
                  alt="iOS Add to Home Screen"
                />
                <br/>
              </div>
              <li style={styles.listItem}>3.Tap "Add."</li>
              <br/>
              <div style={styles.imageWrapper}>
                <img
                  style={styles.image}
                  src="/src/assets/ios3.png"
                  alt="iOS Add to Home Screen"
                />
              </div>
            </ul>
          </figure>
        </section>

        <section>
          <h2 style={styles.subheading}>:For Android (Chrome)</h2>
          <figure>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                1:Open Google Chrome and navigate to the website you'd like to add to the home screen. Tap the three-dot menu icon in the top right.
              </li>
              <div style={styles.imageWrapper}>
                <img
                  style={styles.image}
                  src="/src/assets/and1.png"
                  alt="Android Add to Home Screen"
                />
              </div>
              <li style={styles.listItem}>2.Select "Add to Home Screen" from the menu.</li>
              <div style={styles.imageWrapper}>
                <img
                  style={styles.image}
                  src="/src/assets/and2.png"
                  alt="Android Add to Home Screen"
                />
              </div>
              <li style={styles.listItem}>
                3.Now you can edit the name for the home screen shortcut and tap "Add."
              </li>
              <div style={styles.imageWrapper}>
                <img
                  style={styles.image}
                  src="/src/assets/and3.png"
                  alt="Android Add to Home Screen"
                />
              </div>
            </ul>
          </figure>
        </section>

        <section>
          <h2 style={styles.subheading}>:For Other Browsers</h2>
          <figure>
            <ul style={styles.list}>
              <li style={styles.listItem}>
               1. With Mozilla Firefox, tap the three-dot menu icon in the toolbar, then select "Add to Home Screen."
              </li>
              <div style={styles.imageWrapper}>
                <img
                  style={styles.image}
                  src="/src/assets/moz.png"
                  alt="Other Browsers Add to Home Screen"
                />
              </div>
              <li style={styles.listItem}>
                2.For Microsoft Edge, select the three-dot menu icon in the toolbar, then tap "Add to Phone."
              </li>
              <div style={styles.imageWrapper}>
                <img
                  style={styles.image}
                  src="/src/assets/edge.png"
                  alt="Other Browsers Add to Home Screen"
                />
              </div>
            </ul>
          </figure>
        </section>
      </article>
    </main>
  );
};

export default Application;
