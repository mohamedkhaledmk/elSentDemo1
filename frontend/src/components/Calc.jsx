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
  const [grams, setGrams] = useState(""); // New state for grams input

  // Purity multipliers for gold
  const goldPurities = [
    { label: "24k", multiplier: 1 },
    { label: "21k", multiplier: 0.857 },
    { label: "18k", multiplier: 0.75 },
  ];

  // Handle dropdown selection
  const handleMetalChange = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const price = selectedOption.getAttribute("data-price");
    setSelectedPrice(price || ""); // Set selected price
    setCurrentInput(price || ""); // Set as initial input in calculator
  };

  // Handle button clicks
  const handleButtonClick = (value) => {
    if (value === "Erase") {
      clearInput();
    } else {
      setCurrentInput((prev) => prev + value);
    }
  };

  // Clear input
  const clearInput = () => {
    setCurrentInput("");
    setGrams("");
  };

  // Calculate total price based on grams
  const handleGramsChange = (event) => {
    const enteredGrams = event.target.value;
    setGrams(enteredGrams);

    if (selectedPrice && enteredGrams) {
      const total = (parseFloat(selectedPrice) * parseFloat(enteredGrams)).toFixed(2);
      setCurrentInput(total); // Update the output field with the total price
    } else {
      setCurrentInput("");
    }
  };

  return (
    <div className="fixed bottom-20 right-10 bg-[#15141788] w-1/4 h-auto z-50 rounded-lg p-4">
      {/* Dropdown Menu */}
      <div className="metal-selection mb-4">
        <select
          id="category"
          onChange={handleMetalChange}
          aria-label="Choose Metal Type"
          style={{ backgroundColor: "rgba(224, 224, 224, 0.33)" }}
        >
          <option value="" disabled selected>
            Select Metal
          </option>
          {metals.map((item) => {
            if (item.metal.toLowerCase() === "gold") {
              return goldPurities.map((purity) => (
                <option
                  key={`${item.metal}-${purity.label}`}
                  value={`${item.metal}-${purity.label}`}
                  data-price={(item.price * purity.multiplier).toFixed(2)}
                >
                  {item.metal} ({purity.label}) - SAR {(item.price * purity.multiplier).toFixed(2)}
                </option>
              ));
            }
            return (
              <option key={item.metal} value={item.metal} data-price={item.price}>
                {item.metal} - SAR {item.price}
              </option>
            );
          })}
        </select>
      </div>

      {/* Input Field for Grams */}
      <div className="grams-input mb-4">
        <input
          type="number"
          placeholder="Enter grams"
          value={grams}
          onChange={handleGramsChange}
          className="w-full p-2 rounded-lg"
          style={{ backgroundColor: "rgba(224, 224, 224, 0.33)" }}
        />
      </div>

      {/* Display Screen */}
      <div id="display" className="calculator-display mb-4 text-white font-bold">
        {currentInput || "0"}
      </div>

      {/* Calculator Buttons */}
      <div id="buttons" className="calculator-buttons grid grid-cols-4 gap-2">
        <button
          className="col-span-4 bg-red-500 text-white p-2 rounded-lg"
          onClick={() => handleButtonClick("Erase")}
        >
          Erase
        </button>
      </div>
    </div>
  );
};

export default Calc;
