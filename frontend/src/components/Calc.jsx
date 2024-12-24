import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllMetals } from "../store/metals/metalsSlice";
const Calc = () => {
  const { metals } = useSelector((state) => state.metal);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMetals());
  }, [dispatch]);
  // State variables
  const [selectedPrice, setSelectedPrice] = useState("");
  const [currentInput, setCurrentInput] = useState("");
  // Handle dropdown selection
  const handleMetalChange = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const price = selectedOption.getAttribute("data-price");
    setSelectedPrice(price || ""); // Set selected price
    setCurrentInput(price || ""); // Set as initial input in calculator
  };

  // Handle button clicks
  const handleButtonClick = (value) => {
    if (value === "=") {
      calculateResult();
    } else if (value === "Erase") {
      clearInput();
    } else {
      setCurrentInput((prev) => prev + value);
    }
  };

  // Perform calculation
  const calculateResult = () => {
    try {
      // Replace ÷ and × with / and * for valid JavaScript evaluation
      const sanitizedInput = currentInput.replace("÷", "/").replace("×", "*");
      const result = eval(sanitizedInput); // Safe here as input is user-controlled in UI
      setCurrentInput(result.toString());
    } catch {
      setCurrentInput("Error");
    }
  };

  // Clear input
  const clearInput = () => {
    setCurrentInput("");
  };

  return (
    <div className="fixed bottom-20 right-10 bg-[#15141788] w-1/4 h-1/2 z-50 rounded-lg p-4">
      {/* Dropdown Menu */}
      <div className="metal-selection">
        <select
          id="category"
          onChange={handleMetalChange}
          aria-label="Choose Metal Type"
          style={{ backgroundColor: "rgba(224, 224, 224, 0.33)" }}
        >
          <option value="" disabled selected>
            Select Metal
          </option>
          {metals.map((item) => (
            <option key={item.metal} value={item.metal} data-price={item.price}>
              {item.metal}
            </option>
          ))}
        </select>
      </div>

      {/* Display Screen */}
      <div id="display" className="calculator-display">
        {currentInput || "0"}
      </div>

      {/* Calculator Buttons */}
      <div id="buttons" className="calculator-buttons">
        <button style={{ gridColumn: "span 4" }} onClick={() => handleButtonClick("=")}>=</button>
        <button
          id="allClear"
          style={{ gridColumn: "span 4" }}
          onClick={() => handleButtonClick("Erase")}
        >
          Erase
        </button>
      </div>
    </div>
  );
};

export default Calc;
