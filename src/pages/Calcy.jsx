import React, { useState, useEffect, useRef } from "react";

const Calcy = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const calculatorRef = useRef(null);

  const handleButtonClick = (value) => {
    if (value === "=") {
      const processedInput = input.replace(/(\+|\-|\*|\/)$/, "0");
      if (!processedInput) {
        setResult("Error");
        return;
      }

      try {
        const evalResult = eval(processedInput);
        setResult(evalResult);
        setInput(evalResult.toString());
      } catch (error) {
        setResult("Error");
      }
    } else {
      if (value === "C") {
        setInput("");
        setResult("");
      } else if (value === "CE") {
        setInput(input.slice(0, -1));
      } else if (value === "%") {
        if (input) {
          const percentage = eval(input) / 100;
          setResult(percentage);
          setInput("");
        }
      } else if (value === "+/-") {
        if (input) {
          const toggledValue = (eval(input) * -1).toString();
          setInput(toggledValue);
        }
      } else if (value === ".") {
        const lastNumber = input.split(/[\+\-\*\/]/).pop();
        if (!lastNumber.includes(".")) {
          setInput(input + value);
        }
      } else {
        const lastChar = input[input.length - 1];
        if ("+-*/".includes(value) && "+-*/".includes(lastChar)) {
          setInput(input.slice(0, -1) + value);
        } else {
          if (result) {
            setInput(result + value);
            setResult("");
          } else {
            setInput(input + value);
          }
        }
      }
    }
  };

  const handleKeyPress = (event) => {
    const key = event.key;
    if (key === "Enter") {
      handleButtonClick("=");
    } else if (key === "Backspace") {
      handleButtonClick("CE");
    } else if (key === "delete") {
      handleButtonClick("C");
    } else if ("0123456789.+-*/%".includes(key)) {
      handleButtonClick(key);
    }
  };

  useEffect(() => {
    if (calculatorRef.current) {
      calculatorRef.current.focus();
    }

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [input]);

  return (
    <div className="calculator" ref={calculatorRef} tabIndex="0">
      <div className="display">{result || input || "0"}</div>
      <div className="buttons">
        {["7", "8", "9", "/"].map((item) => (
          <button key={item} onClick={() => handleButtonClick(item)}>
            {item}
          </button>
        ))}
        {["4", "5", "6", "*"].map((item) => (
          <button key={item} onClick={() => handleButtonClick(item)}>
            {item}
          </button>
        ))}
        {["1", "2", "3", "-"].map((item) => (
          <button key={item} onClick={() => handleButtonClick(item)}>
            {item}
          </button>
        ))}
        {["C", "0", ".", "+", "CE", "%", "+/-", "="].map((item) => (
          <button key={item} onClick={() => handleButtonClick(item)}>
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calcy;
