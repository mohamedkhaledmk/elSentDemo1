import React from "react";

const Application = () => {
  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      backgroundColor: "#151417", // Dark brown background
      minHeight: "100vh",
      color: "#F1DCA7", // Text color for contrast
    },
    heading: {
      fontSize: "2.5rem",
      marginBottom: "20px",
      color: "#F1DCA7", // Goldy tone for the heading
      textAlign: "center",
    },
    card: {
      backgroundColor: "#262321", // Slightly lighter brown for cards
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow
      marginBottom: "30px",
    },
    sectionTitle: {
      fontSize: "1.8rem",
      color: "#E5C59E", // Subtle goldy color for section titles
      marginBottom: "15px",
      textAlign: "left",
      borderBottom: "2px solid #ECE4CA14", // Divider for emphasis
      paddingBottom: "5px",
    },
    imageWrapper: {
      marginBottom: "15px",
      display: "flex",
      justifyContent: "center",
    },
    image: {
      width: "100%",
      maxWidth: "600px",
      borderRadius: "8px",
      border: "1px solid #d1d5db",
    },
    text: {
      fontSize: "1rem",
      color: "#F1DCA7", // Text color matches the background contrast
      marginBottom: "15px",
      lineHeight: "1.6",
    },
    list: {
      marginLeft: "20px",
      listStyleType: "decimal",
      color: "#F1DCA7", // List text color
    },
    listItem: {
      marginBottom: "15px",
    },
  };

  return (
    <main style={styles.container}>
      <h1 style={styles.heading}>Download Our App</h1>
      
      {/* iOS Section */}
      <div style={styles.card}>
        <h2 style={styles.sectionTitle}>For iPhone or iPad (Safari)</h2>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            Open Safari and navigate to the website you'd like to add to the home screen. Tap the share button (up arrow within a square) in the toolbar.
          </li>
          <div style={styles.imageWrapper}>
            <img style={styles.image} src="/src/assets/ios1.jpg" alt="iOS Add to Home Screen" />
          </div>
          <li style={styles.listItem}>
            Scroll through the share sheet and tap "Add to Home Screen." If you don't see this option, it can be added from the "Edit Actions" option at the bottom of the share sheet.
          </li>
          <div style={styles.imageWrapper}>
            <img style={styles.image} src="/src/assets/ios2.jpg" alt="iOS Add to Home Screen" />
          </div>
          <li style={styles.listItem}>Tap "Add."</li>
          <div style={styles.imageWrapper}>
            <img style={styles.image} src="/src/assets/ios3.png" alt="iOS Add to Home Screen" />
          </div>
        </ul>
      </div>
      
      {/* Android Section */}
      <div style={styles.card}>
        <h2 style={styles.sectionTitle}>For Android (Chrome)</h2>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            Open Google Chrome and navigate to the website you'd like to add to the home screen. Tap the three-dot menu icon in the top right.
          </li>
          <div style={styles.imageWrapper}>
            <img style={styles.image} src="/src/assets/and1.png" alt="Android Add to Home Screen" />
          </div>
          <li style={styles.listItem}>Select "Add to Home Screen" from the menu.</li>
          <div style={styles.imageWrapper}>
            <img style={styles.image} src="/src/assets/and2.png" alt="Android Add to Home Screen" />
          </div>
          <li style={styles.listItem}>
            Now you can edit the name for the home screen shortcut and tap "Add."
          </li>
          <div style={styles.imageWrapper}>
            <img style={styles.image} src="/src/assets/and3.png" alt="Android Add to Home Screen" />
          </div>
        </ul>
      </div>
      
      {/* Other Browsers Section */}
      <div style={styles.card}>
        <h2 style={styles.sectionTitle}>For Other Browsers</h2>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            With Mozilla Firefox, tap the three-dot menu icon in the toolbar, then select "Add to Home Screen."
          </li>
          <div style={styles.imageWrapper}>
            <img style={styles.image} src="/src/assets/moz.png" alt="Other Browsers Add to Home Screen" />
          </div>
          <li style={styles.listItem}>
            For Microsoft Edge, select the three-dot menu icon in the toolbar, then tap "Add to Phone."
          </li>
          <div style={styles.imageWrapper}>
            <img style={styles.image} src="/src/assets/edge.png" alt="Other Browsers Add to Home Screen" />
          </div>
        </ul>
      </div>
    </main>
  );
};

export default Application;
