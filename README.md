# Calcy

Calcy is a modern calculator built with React and Vite. It combines a clean interface with advanced expression support, memory shortcuts, and recent-operation history.

## Features

- Arithmetic operations: addition, subtraction, multiplication, and division
- Parentheses support for nested expressions
- Exponent operator `^` and square `x²`
- Square root input via `√(`
- Scientific functions: `sin`, `cos`, `tan`, and `log`
- Percentage support and reciprocal calculation (`1/x`)
- Memory controls: `MC`, `MR`, `M+`, and `M-`
- Answer recall with `Ans`
- Keyboard support for digits, operators, Enter, Backspace, and Delete
- Responsive layout with modern UI styling

## Technologies Used

- React 19
- Vite
- Core CSS styling

## Installation

1. Clone the repository:

```bash
git clone https://github.com/uttam-marakana/Calcy.git
cd Calcy
```

2. Install dependencies:

```bash
npm install
```

## Running the app

```bash
npm run dev
```

Then open the local host URL shown in the terminal.

## Usage

- Click or type numbers and operators to build an expression.
- Press `Enter` or click `=` to calculate.
- Use `C` to clear everything and `⌫` to delete the last character.
- Use `M+` and `M-` to update memory, `MR` to recall, and `MC` to clear memory.
- Use `Ans` to reuse the last calculated result.

## Notes

- Expressions such as `(3 + 4) × 5 - √(16)` are supported.
- The calculator preserves recent results in the history panel for quick review.
