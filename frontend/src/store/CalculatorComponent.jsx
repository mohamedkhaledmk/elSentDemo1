<<<<<<< HEAD
// In CalculatorComponent.jsx
import React, { useState } from "react";

const CalculatorComponent = () => {
  const [currentInput, setCurrentInput] = useState("");
  const [calculatorVisible, setCalculatorVisible] = useState(false);

  const toggleCalculator = () => {
    setCalculatorVisible((prev) => !prev);
  };

  return (
    <div>
      <button
        id="calculatorToggle"
        className="floating-button"
        onClick={toggleCalculator}
      >
=======
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMetals } from "./metals/metalsSlice";
import "../index.css"; // Import your CSS here if applicable

const CalculatorComponent = () => {
  const { metals } = useSelector((state) => state.metal);
  const dispatch = useDispatch();

  const [currentInput, setCurrentInput] = useState("");
  const [calculatorVisible, setCalculatorVisible] = useState(false);

  useEffect(() => {
    dispatch(getAllMetals());
  }, [dispatch]);

  const handleButtonClick = (value) => {
    if (value === "=") {
      calculate();
    } else if (value === "Erase" || value === "مسح") {
      clear();
    } else {
      setCurrentInput((prev) => prev + value);
    }
  };

  const calculate = () => {
    try {
      const result = evaluateExpression(currentInput);
      setCurrentInput(result.toString());
    } catch {
      setCurrentInput("Error");
    }
  };

  const evaluateExpression = (expression) => {
    expression = expression.replace("÷", "/").replace("×", "*");
    return Function(`'use strict'; return (${expression})`)();
  };

  const clear = () => {
    setCurrentInput("");
  };

  const toggleCalculator = () => {
    setCalculatorVisible((prev) => !prev);
    console.log("Calculator visibility toggled:", !calculatorVisible);
  };

  return (
    <>
      <button id="calculatorToggle" className="floating-button" onClick={toggleCalculator}>
>>>>>>> 359372e43811b3f52f1fa9cddd0ee1717ac78be3
        <i className="fas fa-calculator"></i>
      </button>

      {calculatorVisible && (
        <div id="calculatorContainer" className="calculator-container">
          <div id="display" className="calculator-display">
<<<<<<< HEAD
            {currentInput || "0"}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculatorComponent; // Correct export
=======
            {currentInput}
          </div>
          <div id="buttons" className="calculator-buttons">
            <div className="metal-selection">
              <select
                id="category"
                required
                className="bg-theme-bg-light px-2 text-body-text-color w-full block sm:w-auto sm:inline py-3 rounded-lg outline-none border border-border-info-color cursor-pointer"
              >
                <option value="">Choose Metal Type</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Palladium">Palladium</option>
                <option value="Platinum">Platinum</option>
              </select>
            </div>
            <button onClick={() => handleButtonClick("7")}>7</button>
            <button onClick={() => handleButtonClick("8")}>8</button>
            <button onClick={() => handleButtonClick("9")}>9</button>
            <button onClick={() => handleButtonClick("÷")}>÷</button>
            <button onClick={() => handleButtonClick("4")}>4</button>
            <button onClick={() => handleButtonClick("5")}>5</button>
            <button onClick={() => handleButtonClick("6")}>6</button>
            <button onClick={() => handleButtonClick("×")}>×</button>
            <button onClick={() => handleButtonClick("1")}>1</button>
            <button onClick={() => handleButtonClick("2")}>2</button>
            <button onClick={() => handleButtonClick("3")}>3</button>
            <button onClick={() => handleButtonClick("-")}>-</button>
            <button onClick={() => handleButtonClick("0")}>0</button>
            <button onClick={() => handleButtonClick(".")}>.</button>
            <button onClick={() => handleButtonClick("=")}>=</button>
            <button onClick={() => handleButtonClick("+")}>+</button>
            <button id="allClear" onClick={() => handleButtonClick("Erase")} style={{ gridColumn: "span 4" }}>
              Erase
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CalculatorComponent;
>>>>>>> 359372e43811b3f52f1fa9cddd0ee1717ac78be3
