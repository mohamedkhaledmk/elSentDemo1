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
  const [grams, setGrams] = useState("");
  const [workmanship, setWorkmanship] = useState("");
  const [activeTab, setActiveTab] = useState("");
  const [caratWeight, setCaratWeight] = useState("");
  const [cutShape, setCutShape] = useState("");
  const [clarity, setClarity] = useState("");
  const [color, setColor] = useState("");
  const [diamondPrice, setDiamondPrice] = useState("");
  const [goldBasePrice, setGoldBasePrice] = useState(""); // Base price for diamond calculations

  const goldPurities = [
    { label: "24k", multiplier: 1 },
    { label: "22k", multiplier: 0.9167 },
    { label: "21k", multiplier: 0.857 },
    { label: "18k", multiplier: 0.75 },
  ];

  const handleMetalChange = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const price = selectedOption.getAttribute("data-price");
    setSelectedPrice(price || "");
    setCurrentInput(price || "");
  };

  const handleButtonClick = (value) => {
    if (value === "Erase") {
      clearInput();
    } else {
      setCurrentInput((prev) => prev + value);
    }
  };

  const clearInput = () => {
    setCurrentInput("");
    setGrams("");
    setWorkmanship("");
    setCaratWeight("");
    setCutShape("");
    setClarity("");
    setColor("");
    setDiamondPrice("");
    setGoldBasePrice("");
  };

  const calculateTotalPrice = (updatedGrams = grams, updatedWorkmanship = workmanship) => {
    if (selectedPrice && updatedGrams && updatedWorkmanship) {
      const adjustedGrams = parseFloat(updatedGrams); // Add 2.5 to the grams
      const basePrice = (parseFloat(selectedPrice) + 2.5) * adjustedGrams;
      const totalWorkmanshipFee = parseFloat(updatedWorkmanship) * adjustedGrams;
      const total = (basePrice + totalWorkmanshipFee).toFixed(2);
      setCurrentInput(total);
    } else {
      setCurrentInput("");
    }
  };

  const handleGramsChange = (event) => {
    const value = event.target.value;
    setGrams(value);
    calculateTotalPrice(value, workmanship);
  };

  const handleWorkmanshipChange = (event) => {
    const value = event.target.value;
    setWorkmanship(value);
    calculateTotalPrice(grams, value);
  };

  const calculateDiamondPrice = () => {
    if (caratWeight && cutShape && clarity && color) {
      const price = ((parseFloat(goldBasePrice) || 0) + caratWeight * 1000).toFixed(2);
      setDiamondPrice(price);
      setGoldBasePrice(price); // Overwrite the migrated gold price with the calculated diamond value
    } else {
      setDiamondPrice("Incomplete input");
    }
  };

  const migrateToDiamondCalculator = () => {
    if (currentInput) {
      setGoldBasePrice(currentInput); // Pass the gold calculator output as base
      setActiveTab("diamond"); // Switch to the diamond tab
    }
  };

  const clearDiamondInput = () => {
    setCaratWeight("");
    setCutShape("");
    setClarity("");
    setColor("");
    setDiamondPrice("");
  };

  return (
    <div className="fixed bottom-20 right-10 bg-[#15141788] w-1/4 h-auto z-50 rounded-lg p-4">
      <div className="tab-buttons flex justify-between mb-4">
        <button
          className={`p-2 w-1/2 ${activeTab === "metal" ? "bg-theme-bg-light text-white" : "bg-color-primary"} hover:bg-color-dark`}
          onClick={() => setActiveTab("metal")}
        >
          Metal
        </button>
        <button
          className={`p-2 w-1/2 ${activeTab === "diamond" ? "bg-theme-bg-light text-white" : "bg-color-primary"} hover:bg-color-dark`}
          onClick={() => setActiveTab("diamond")}
        >
          Diamond
        </button>
      </div>

      {activeTab === "metal" && (
        <div>
          <div className="metal-selection mb-4">
            <select id="category" onChange={handleMetalChange} aria-label="Choose Metal Type" style={{ backgroundColor: "rgba(224, 224, 224, 0.33) "}}>
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

          <div className="grams-input mb-4 text-white">
            <input
              type="number"
              placeholder="Enter grams"
              value={grams}
              onChange={handleGramsChange}
              className="w-full p-2 rounded-lg"
              style={{ backgroundColor: "rgba(224, 224, 224, 0.33)" }}
            />
          </div>

          <div className="workmanship-input mb-4 text-white">
            <input
              type="number"
              placeholder="Enter workmanship fee (SAR)"
              value={workmanship}
              onChange={handleWorkmanshipChange}
              className="w-full p-2 rounded-lg"
              style={{ backgroundColor: "rgba(224, 224, 224, 0.33)" }}
            />
          </div>

          <div id="display" className="calculator-display mb-4 text-white font-bold">
            {currentInput || "0"}
          </div>

          <div id="buttons" className="calculator-buttons grid grid-cols-4 gap-2">
            <button className="col-span-4 bg-red-500 text-white p-2 rounded-lg" onClick={() => handleButtonClick("Erase")}>
              Erase
            </button>
            <button className="col-span-4 bg-blue-500 text-white p-2 rounded-lg" onClick={migrateToDiamondCalculator}>
              Proceed to Diamond
            </button>
          </div>
        </div>
      )}

      {activeTab === "diamond" && (
        <div>
          <div className="carat-weight-input mb-4">
            <input
              type="number"
              placeholder="Enter carat weight (1-15)"
              value={caratWeight}
              onChange={(e) => setCaratWeight(e.target.value)}
              min={1}
              max={15}
              className="w-full p-2 rounded-lg"
              style={{ backgroundColor: "rgba(224, 224, 224, 0.33)",color: "white" }}
            />
          </div>

          <div className="cut-shape-dropdown mb-4">
            <select
              onChange={(e) => setCutShape(e.target.value)}
              value={cutShape}
              className="w-full p-2 rounded-lg"
              style={{ backgroundColor: "rgba(224, 224, 224, 0.33)",color: "white" }}
            >
              <option value="" disabled>
                Select Cut/Shape
              </option>
              <option value="round" style={{ color: "black" }}>Round</option>
              <option value="pear" style={{ color: "black" }}>Pear</option>
            </select>
          </div>

          <div className="clarity-dropdown mb-4">
            <select
              onChange={(e) => setClarity(e.target.value)}
              value={clarity}
              className="w-full p-2 rounded-lg"
              style={{ backgroundColor: "rgba(224, 224, 224, 0.33)",color: "white" }}
            >
              <option value="" disabled>
                Select Clarity
              </option>
              <option value="F" style={{ color: "black" }}>F</option>
              <option value="IF" style={{ color: "black" }}>IF</option>
              <option value="VVS1" style={{ color: "black" }}>VVS1</option>
              <option value="VVS2" style={{ color: "black" }}>VVS2</option>
              <option value="VS1" style={{ color: "black" }}>VS1</option>
              <option value="VS2" style={{ color: "black" }}>VS2</option>
              <option value="SI1" style={{ color: "black" }}>SI1</option>
              <option value="SI2" style={{ color: "black" }}>SI2</option>
            </select>
          </div>

          <div className="color-dropdown mb-4">
            <select
              onChange={(e) => setColor(e.target.value)}
              value={color}
              className="w-full p-2 rounded-lg"
              style={{ backgroundColor: "rgba(224, 224, 224, 0.33)" ,color: "white"}}
            >
              <option value="" disabled>
                Select Color
              </option>
              <option value="D" style={{ color: "black" }}>D</option>
              <option value="E" style={{ color: "black" }}>E</option>
              <option value="F" style={{ color: "black" }}>F</option>
              <option value="G" style={{ color: "black" }}>G</option>
              <option value="H" style={{ color: "black" }}>H</option>
              <option value="I" style={{ color: "black" }}>I</option>
              <option value="J" style={{ color: "black" }}>J</option>
            </select>
          </div>

          <div id="display" className="calculator-display mb-4 text-white font-bold">
            {goldBasePrice || "0"}
          </div>

          <div id="buttons" className="calculator-buttons grid grid-cols-4 gap-2">
            <button className="col-span-4 bg-red-500 text-white p-2 rounded-lg" onClick={() => handleButtonClick("Erase")}>
              Erase
            </button>
            <button className="col-span-4 bg-blue-500 text-white p-2 rounded-lg"  onClick={calculateDiamondPrice}>
              Calculate
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calc;
