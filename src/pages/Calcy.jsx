import { useState, useEffect, useRef, useCallback } from "react";

const buttons = [
  { label: "MC", value: "MC", variant: "memory" },
  { label: "MR", value: "MR", variant: "memory" },
  { label: "M+", value: "M+", variant: "memory" },
  { label: "M-", value: "M-", variant: "memory" },
  { label: "⌫", value: "CE", variant: "action" },

  { label: "C", value: "C", variant: "action" },
  { label: "(", value: "(" },
  { label: ")", value: ")" },
  { label: "^", value: "^", variant: "operator" },
  { label: "√", value: "sqrt", variant: "operator" },
  { label: "sin", value: "sin", variant: "operator" },
  { label: "cos", value: "cos", variant: "operator" },

  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "÷", value: "÷", variant: "operator" },
  { label: "%", value: "%", variant: "operator" },
  { label: "tan", value: "tan", variant: "operator" },

  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "×", value: "×", variant: "operator" },
  { label: "x²", value: "square", variant: "operator" },
  { label: "log", value: "log", variant: "operator" },

  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "-", value: "-", variant: "operator" },
  { label: "1/x", value: "reciprocal", variant: "operator" },

  { label: "+/-", value: "toggle", variant: "action" },
  { label: "0", value: "0" },
  { label: ".", value: "." },
  { label: "+", value: "+", variant: "operator" },
  { label: "Ans", value: "Ans", variant: "action" },
  { label: "=", value: "=", variant: "equal" },
];

function Calcy() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [memory, setMemory] = useState(0);
  const [lastResult, setLastResult] = useState(null);
  const [history, setHistory] = useState([]);
  const calculatorRef = useRef(null);

  const formatExpression = useCallback(
    (expression) =>
      expression
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/\^/g, "**")
        .replace(/√\(/g, "Math.sqrt(")
        .replace(/sin\(/g, "Math.sin(")
        .replace(/cos\(/g, "Math.cos(")
        .replace(/tan\(/g, "Math.tan(")
        .replace(/log\(/g, "Math.log10(")
        .replace(/(\d+(?:\.\d+)?)%/g, "($1*0.01)")
        .replace(/Ans/g, lastResult !== null ? String(lastResult) : "0")
        .replace(/x²/g, "**2"),
    [lastResult],
  );

  const evaluateExpression = useCallback(
    (expression) => {
      const sanitized = formatExpression(expression).replace(
        /[+\-*/^.]+$/g,
        "",
      );
      if (!sanitized) {
        throw new Error("Invalid expression");
      }

      const value = Function('"use strict"; return (' + sanitized + ")")();
      if (
        typeof value !== "number" ||
        Number.isNaN(value) ||
        !Number.isFinite(value)
      ) {
        throw new Error("Calculation error");
      }

      return Number(value.toPrecision(12));
    },
    [formatExpression],
  );

  const pushHistory = useCallback((expression, value) => {
    setHistory((previous) => [{ expression, value }, ...previous.slice(0, 5)]);
  }, []);

  const handleButtonClick = useCallback(
    (value) => {
      const lastChar = input.slice(-1);
      const operators = ["+", "-", "×", "÷", "^"];

      if (value === "C") {
        setInput("");
        setResult("");
        return;
      }

      if (value === "CE") {
        setInput((current) => current.slice(0, -1));
        return;
      }

      if (value === "MC") {
        setMemory(0);
        return;
      }

      if (value === "MR") {
        if (lastResult !== null) {
          setInput((current) => current + String(memory));
        }
        return;
      }

      if (value === "M+") {
        const currentValue = result || input;
        try {
          const numeric = evaluateExpression(currentValue || "0");
          setMemory((m) => m + numeric);
        } catch {
          setResult("Error");
        }
        return;
      }

      if (value === "M-") {
        const currentValue = result || input;
        try {
          const numeric = evaluateExpression(currentValue || "0");
          setMemory((m) => m - numeric);
        } catch {
          setResult("Error");
        }
        return;
      }

      if (value === "toggle") {
        const numberMatch = input.match(/(-?\d+(?:\.\d+)?)$/);
        if (!numberMatch) return;
        const number = numberMatch[1];
        const prefix = input.slice(0, -number.length);
        setInput(
          prefix + (number.startsWith("-") ? number.slice(1) : "-" + number),
        );
        return;
      }

      if (value === "sqrt") {
        setInput((current) => current + "√(");
        return;
      }

      if (value === "square") {
        if (!input) return;
        setInput((current) => current + "**2");
        return;
      }

      if (value === "reciprocal") {
        if (!input) return;
        setInput((current) => `1/(${current})`);
        return;
      }

      if (value === "Ans") {
        if (lastResult !== null) {
          setInput((current) => current + String(lastResult));
        }
        return;
      }

      if (value === "=") {
        try {
          const numeric = evaluateExpression(input);
          setResult(numeric);
          setLastResult(numeric);
          pushHistory(input, numeric);
          setInput(String(numeric));
        } catch {
          setResult("Error");
        }
        return;
      }

      if (value === ".") {
        const lastNumber = input.split(/[+\-×÷^/*]/).pop();
        if (!lastNumber.includes(".")) {
          setInput((current) => current + value);
        }
        return;
      }

      if (operators.includes(value)) {
        if (!input && value !== "-") {
          return;
        }
        if (operators.includes(lastChar) || lastChar === ".") {
          setInput((current) => current.slice(0, -1) + value);
        } else {
          setInput((current) => current + value);
        }
        return;
      }

      if (/\d/.test(value)) {
        if (result && input === String(result)) {
          setResult("");
          setInput(value);
          return;
        }
        setInput((current) => current + value);
        return;
      }

      setInput((current) => current + value);
    },
    [input, result, memory, lastResult, evaluateExpression, pushHistory],
  );

  useEffect(() => {
    if (calculatorRef.current) {
      calculatorRef.current.focus();
    }

    const handleKeyPress = (event) => {
      const { key } = event;
      if (key === "Enter") {
        handleButtonClick("=");
      } else if (key === "Backspace") {
        handleButtonClick("CE");
      } else if (key === "Delete") {
        handleButtonClick("C");
      } else if (/[0-9]/.test(key)) {
        handleButtonClick(key);
      } else if (key === ".") {
        handleButtonClick(".");
      } else if (key === "+") {
        handleButtonClick("+");
      } else if (key === "-") {
        handleButtonClick("-");
      } else if (key === "*") {
        handleButtonClick("×");
      } else if (key === "/") {
        handleButtonClick("÷");
      } else if (key === "%") {
        handleButtonClick("%");
      } else if (key === "(") {
        handleButtonClick("(");
      } else if (key === ")") {
        handleButtonClick(")");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleButtonClick]);

  return (
    <section className="calculator" ref={calculatorRef} tabIndex="0">
      <div className="calculator-top">
        <div className="status-bar">
          <span>Memory: {memory}</span>
          <span>Ans: {lastResult !== null ? lastResult : "0"}</span>
        </div>
        <div className="display-panel">
          <div className="small-display">{input || "0"}</div>
          <div className="large-display">
            {result !== "" ? result : input || "0"}
          </div>
        </div>
        <div className="history-panel">
          <h2>Recent</h2>
          {history.length === 0 ? (
            <p className="history-empty">No recent calculations yet.</p>
          ) : (
            history.map((entry, index) => (
              <div className="history-item" key={index}>
                <span>{entry.expression}</span>
                <strong>{entry.value}</strong>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="buttons">
        {buttons.map((button) => (
          <button
            key={button.label}
            type="button"
            className={
              button.variant ? `button-${button.variant}` : "button-standard"
            }
            onClick={() => handleButtonClick(button.value)}
          >
            {button.label}
          </button>
        ))}
      </div>
    </section>
  );
}

export default Calcy;
