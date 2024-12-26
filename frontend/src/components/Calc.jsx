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
  const [grams, setGrams] = useState(""); // State for grams input
  const [workmanship, setWorkmanship] = useState(""); // State for workmanship input
  const [activeTab, setActiveTab] = useState(""); // State for active tab (Metal or Diamond)
  const [caratWeight, setCaratWeight] = useState(""); // Carat Weight input
  const [cutShape, setCutShape] = useState(""); // Selected cut/shape
  const [clarity, setClarity] = useState(""); // Selected clarity
  const [color, setColor] = useState(""); // Selected color
  const [diamondPrice, setDiamondPrice] = useState(""); // Output price for diamonds

  // Purity multipliers for gold
  const goldPurities = [
    { label: "24k", multiplier: 1 },
    { label: "21k", multiplier: 0.857 },
    { label: "18k", multiplier: 0.75 },
  ];

  // Handle dropdown selection for metals
  const handleMetalChange = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const price = selectedOption.getAttribute("data-price");
    setSelectedPrice(price || ""); // Set selected price
    setCurrentInput(price || ""); // Set as initial input in calculator
  };

  // Handle button clicks for metal calculator
  const handleButtonClick = (value) => {
    if (value === "Erase") {
      clearInput();
    } else {
      setCurrentInput((prev) => prev + value);
    }
  };

  // Clear inputs
  const clearInput = () => {
    setCurrentInput("");
    setGrams("");
    setWorkmanship("");
    setCaratWeight("");
    setCutShape("");
    setClarity("");
    setColor("");
    setDiamondPrice("");
  };

  // Calculate total price for metals
  const calculateTotalPrice = (updatedGrams = grams, updatedWorkmanship = workmanship) => {
    if (selectedPrice && updatedGrams) {
      const basePrice = parseFloat(selectedPrice) * parseFloat(updatedGrams);
      const workmanshipFee = parseFloat(updatedWorkmanship) || 0; // Default to 0 if empty
      const total = (basePrice + workmanshipFee).toFixed(2);
      setCurrentInput(total); // Update the output field with the total price
    } else {
      setCurrentInput("");
    }
  };

  // Handle grams input change
  const handleGramsChange = (event) => {
    const value = event.target.value;
    setGrams(value);
    calculateTotalPrice(value, workmanship);
  };

  // Handle workmanship input change
  const handleWorkmanshipChange = (event) => {
    const value = event.target.value;
    setWorkmanship(value);
    calculateTotalPrice(grams, value);
  };

  // Calculate Diamond Price
  const calculateDiamondPrice = () => {
    if (caratWeight && cutShape && clarity && color) {
      // Dummy price calculation logic (replace with actual pricing formula as needed)
      const price = (caratWeight * 1000).toFixed(2); // Example price
      setDiamondPrice(price);
    } else {
      setDiamondPrice("Incomplete input");
    }
  };

  return (
    <div className="fixed bottom-20 right-10 bg-[#15141788] w-1/4 h-auto z-50 rounded-lg p-4">
      {/* Tabs for Metal and Diamond */}
      <div className="tab-buttons flex justify-between mb-4">
        <button
          className={`p-2 w-1/2 ${
            activeTab === "metal" ? "bg-theme-bg-light text-white" : "bg-color-primary"
          } hover:bg-color-dark `}
          onClick={() => setActiveTab("metal")}
        >
          Metal
        </button>
        <button
          className={`p-2 w-1/2 ${
            activeTab === "diamond" ? "bg-theme-bg-light text-white" : "bg-color-primary"
          } hover:bg-color-dark `}
          onClick={() => setActiveTab("diamond")}
        >
          Diamond
        </button>
      </div>

      {/* Metal Calculator */}
      {activeTab === "metal" && (
        <div>
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

          {/* Input Field for Workmanship */}
          <div className="workmanship-input mb-4">
            <input
              type="number"
              placeholder="Enter workmanship fee (SAR)"
              value={workmanship}
              onChange={handleWorkmanshipChange}
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
      )}

      {/* Diamond Calculator */}
      {activeTab === "diamond" && (
        <div>
          {/* Input Field for Carat Weight */}
          <div className="carat-weight-input mb-4">
            <input
              type="number"
              placeholder="Enter carat weight (1-15)"
              value={caratWeight}
              onChange={(e) => setCaratWeight(e.target.value)}
              min={1}
              max={15}
              className="w-full p-2 rounded-lg"
              style={{ backgroundColor: "rgba(224, 224, 224, 0.33)" }}
            />
          </div>

          {/* Dropdown for Cut/Shape */}
          <div className="cut-shape-dropdown mb-4">
            <select
              onChange={(e) => setCutShape(e.target.value)}
              value={cutShape}
              className="w-full p-2 rounded-lg"
              style={{ backgroundColor: "rgba(224, 224, 224, 0.33)" }}
            >
              <option value="" disabled>
                Select Cut/Shape
              </option>
              <option value="round">Round</option>
              <option value="pear">Pear</option>
            </select>
          </div>

          {/* Dropdown for Clarity */}
          <div className="clarity-dropdown mb-4">
            <select
              onChange={(e) => setClarity(e.target.value)}
              value={clarity}
              className="w-full p-2 rounded-lg"
              style={{ backgroundColor: "rgba(224, 224, 224, 0.33)" }}
            >
              <option value="" disabled>
                Select Clarity
              </option>
              <option value="IF">IF</option>
              <option value="VVS1">VVS1</option>
              <option value="VVS2">VVS2</option>
              <option value="VS1">VS1</option>
              <option value="VS2">VS2</option>
              <option value="SI1">SI1</option>
              <option value="SI2">SI2</option>
            </select>
          </div>

          {/* Dropdown for Color */}
          <div className="color-dropdown mb-4">
            <select
              onChange={(e) => setColor(e.target.value)}
              value={color}
              className="w-full p-2 rounded-lg"
              style={{ backgroundColor: "rgba(224, 224, 224, 0.33)" }}
            >
              <option value="" disabled>
                Select Color
              </option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
              <option value="G">G</option>
              <option value="H">H</option>
              <option value="I">I</option>
              <option value="J">J</option>
            </select>
          </div>

          {/* Display for Diamond Price */}
          <div className="diamond-price-display mb-4 text-white font-bold">
            {diamondPrice || "Enter details to calculate"}
          </div>

          {/* Calculate Button */}
          <div className="calculate-button text-center">
            <button
              className="bg-blue-500 text-white p-2 rounded-lg"
              onClick={calculateDiamondPrice}
            >
              Calculate Price
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calc;
