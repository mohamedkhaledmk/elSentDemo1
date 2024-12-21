class Calculator {
    constructor() {
      this.displayElement = document.getElementById('display');
      this.currentInput = '';
      this.initialize();
    }
  
    initialize() {
      this.buttons = document.querySelectorAll('#buttons button');
      this.bindEvents();
    }
  
    bindEvents() {
      this.buttons.forEach(button => {
        button.addEventListener('click', () => this.handleButtonClick(button.innerText));
      });
  
      const toggleButton = document.getElementById('calculatorToggle');
      toggleButton.addEventListener('click', () => this.toggleCalculator());
    }
  
    handleButtonClick(value) {
      if (value === '=') {
        this.calculate();
      } else if (value === 'Erase' || value === "مسح") {
        this.clear();
      } else {
        this.currentInput += value;
        this.updateDisplay();
      }
    }
  
    calculate() {
      try {
        this.currentInput = this.evaluateExpression(this.currentInput);
      } catch {
        this.currentInput = 'Error';
      }
      this.updateDisplay();
    }
  
    evaluateExpression(expression) {
      expression = expression.replace('÷', '/').replace('×', '*');
      return Function(`'use strict'; return (${expression})`)();
    }
  
    clear() {
      this.currentInput = '';
      this.updateDisplay();
    }
  
    updateDisplay() {
      this.displayElement.innerText = this.currentInput;
    }
  
    toggleCalculator() {
      const calculatorContainer = document.getElementById('calculatorContainer');
      calculatorContainer.style.display = calculatorContainer.style.display === 'none' ? 'block' : 'none';
    }
  }
  
  new Calculator();
  