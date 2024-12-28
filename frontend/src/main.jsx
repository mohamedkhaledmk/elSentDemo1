import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Calc from "./components/Calc";
import App from "./App"; // Assuming App is in the same directory
const Main = () => {
  const [isCalculatorVisible, setCalculatorVisible] = useState(false);

  const toggleCalculator = () => {
    setCalculatorVisible((prevState) => !prevState);
  };
  return (
    <Provider store={store}>
      <button
        className="floating-button"
        onClick={() => {
          toggleCalculator();
        }}
      >
        <i className="fas fa-calculator"></i>
      </button>
      {isCalculatorVisible && <Calc />}
      <App />
    </Provider>
  );
};
ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
