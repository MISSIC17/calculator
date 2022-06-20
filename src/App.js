import { useReducer, useEffect, useRef } from "react";
import "./index.css";
import "./styles.css";
import "./responsive.css";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import { reducer } from "./reducer";
export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const operations = ["+", "-", "*", "/"];
const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});
function formatOperand(operand) {
  if (operand == null) return;
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}
export function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = "";
  // eslint-disable-next-line default-case
  switch (operation) {
    case "+": {
      computation = prev + current;
      break;
    }
    case "-": {
      computation = prev - current;
      break;
    }
    case "*": {
      computation = prev * current;
      break;
    }
    case "/": {
      computation = prev / current;
      break;
    }
  }
  return computation.toString();
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  const outputScreen = useRef(null);

    class Operand{ 
      constructor(id){
      this.id= id;
      this.domElement = document.getElementById(`${this.id}-operand`);
    }
   fontChange = (id, decrease) => {
      if (decrease) {
        this.domElement.classList.replace(`${this.id}-operand`, `${this.id}-operand-small`);
      } else if (this.domElement.classList.contains(`${this.id}-operand-small`)) {
        this.domElement.classList.replace(`${this.id}-operand-small`, `${this.id}-operand`);
      }
    };
    checkCondition = () =>{
      // console.log(this.domElement.innert)
      if (this.domElement.innerText && this.domElement.innerText.length >= 15) {
        this.fontChange(this.id, true);
      }else{
        this.fontChange(this.id,false)
      }
      
    }
  }
  
  useEffect(()=>{
    let prev = new Operand('previous');
    prev.checkCondition();
  });
  
  useEffect((c)=>{
   let curr = new Operand('current');
   curr.checkCondition();
  })

  const handleKeyPress = (e) => {
    if (numbers.includes(parseInt(e.key))) {
      let digit = e.key;
      dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } });
    } else if (operations.includes(e.key)) {
      let operation = e.key;
      dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } });
    } else if (e.key === "Backspace") {
      dispatch({ type: ACTIONS.DELETE_DIGIT });
    } else if (e.key === "Enter" || e.key === "=") {
      dispatch({ type: ACTIONS.EVALUATE });
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  });

  return (
    <div className="calculator-grid">
      <div className="output" ref={outputScreen}>
        <div className="minor-details">
          <span>M</span>
          <span>D</span>
          <span>Math</span>
        </div>
        <div id="previous-operand" className="previous-operand">
          {formatOperand(previousOperand)} {operation}
        </div>
        <div id="current-operand" className="current-operand">
          {formatOperand(currentOperand)}
        </div>
      </div>
      <button
        className="functionalButton span-two"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button
        className="functionalButton"
        onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
      >
        Del
      </button>
      <OperationButton operation="+" dispatch={dispatch}></OperationButton>

      <DigitButton digit="1" dispatch={dispatch}></DigitButton>
      <DigitButton digit="2" dispatch={dispatch}></DigitButton>
      <DigitButton digit="3" dispatch={dispatch}></DigitButton>

      <OperationButton operation="*" dispatch={dispatch}></OperationButton>

      <DigitButton digit="4" dispatch={dispatch}></DigitButton>
      <DigitButton digit="5" dispatch={dispatch}></DigitButton>
      <DigitButton digit="6" dispatch={dispatch}></DigitButton>

      <OperationButton operation="/" dispatch={dispatch} />

      <DigitButton digit="7" dispatch={dispatch}></DigitButton>
      <DigitButton digit="8" dispatch={dispatch}></DigitButton>
      <DigitButton digit="9" dispatch={dispatch}></DigitButton>
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch}></DigitButton>
      <DigitButton digit="0" dispatch={dispatch}></DigitButton>
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
    </div>
  );
}

export default App;
