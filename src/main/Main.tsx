import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataContext } from "../context/Context";
import BtnDecimal from "./BtnDecimal";
import BtnNumbers from "./BtnNumbers";
import BtnOperator from "./BtnOperator";

const Main: FunctionComponent = () => {
  const { selectTheme } = useContext(DataContext);
  const [firstOperand, setFirstOperand] = useState<number>(0);
  const [secondOperand, setSecondOperand] = useState<number>(0);
  const [firstOperandDisplay, setFirstOperandDisplay] = useState<string>(
    firstOperand.toString()
  );
  const [secondOperandDisplay, setSecondOperandDisplay] = useState<string>(
    secondOperand.toString()
  );
  const [calc, setCalc] = useState<boolean>(false);
  const [selectOperator, setSelectOperator] = useState<string>("");
  const [result, setResult] = useState<number>(0);
  const [operator, setOperator] = useState<string>("+");
  const [display, setDisplay] = useState<string>("0");
  const [showResult, setShowResult] = useState<boolean>(false);

  function handleDigits(id: number) {
    // the screen will show either the result of calculation when showResult is true or
    // the number being entered when showResult is false. Hence at start showResult is false
    if (showResult) {
      setResult(() => 0);
      setShowResult(() => false);
    }

    // display => number to be displayed on the screen. A click on a number button will
    // add another number to the display. display is a string. If length of display exceeds 12
    // maximum digits has been set to 12. Send notification to alert user

    if (display.length > 12) {
      return toast.info(`Limit of 12 has been reached `);
    }

    if (display === "0" && id === 0) {
      return;
    }

    if (display === "0") {
      setDisplay(() => id.toString());
    }

    if (display !== "0") {
      setDisplay(() => display + id);
    }
    console.log(display);
    // calc is false at the start, any numbers entered when calc is false will be added to the
    // string display - converted to a number by setFirstOperand. When calc is true - triggered by
    // a click on any of the operators, then the collection of numbers will become secondOperand
    if (!calc) {
      setFirstOperand(() => Number(display + id));
      if (display === "0") {
        setFirstOperandDisplay(() => id.toString());
      } else {
        setFirstOperandDisplay(() => display + id.toString());
      }
    } else {
      setSecondOperand(() => Number(display + id));
      if (display === "0") {
        setSecondOperandDisplay(() => id.toString());
      } else {
        setSecondOperandDisplay(() => display + id.toString());
      }
    }
    // displayStrings(id)
  }

  const handleOperations = (id: string) => {
    setOperator(() => id);
    setSelectOperator(() => id);
    setDisplay(() => "");
    setCalc(() => true);
  };

  const handleResult = () => {
    console.log(calc);
    if (!showResult) {
      setShowResult((showResult) => !showResult);
    }
    if (calc) {
      setCalc((calc) => !calc);
      operations();
      clearCalculations();
    } else {
      return;
    }
  };

  const handleDecimal = (id: string) => {
    if (display.indexOf(".") === -1) {
      setDisplay((display) => display + id);
      if (!calc) {
        setFirstOperand((display) => Number(display + id));
        setFirstOperandDisplay(() => display + id.toString());
      } else {
        setSecondOperand((display) => Number(display + id));
        setSecondOperandDisplay(() => display + id.toString());
      }
    }
  };
  const handleDelete = () => {
    if (display.length < 1) {
      return;
    } else {
      setDisplay((display) => display.slice(0, -1));
      if (!calc) {
        if (display.length === 1) {
          setFirstOperand(() => 0);
          setFirstOperandDisplay(() => "0");
        } else {
          setFirstOperand(() => Number(display.slice(0, -1)));
          setFirstOperandDisplay(() => firstOperandDisplay.slice(0, -1));
        }
      } else {
        if (display.length === 1) {
          setSecondOperand(() => 0);
          setFirstOperandDisplay(() => "0");
        } else {
          setSecondOperand(() => Number(display.slice(0, -1)));
          setSecondOperandDisplay(() => secondOperandDisplay.slice(0, -1));
        }
      }
    }
  };

  const handleReset = () => {
    clearCalculations();
    setCalc(() => false);
    setSelectOperator(() => "");
    setResult(() => 0);
    setOperator(() => "");
    setShowResult(() => false);
    setDisplay(() => "0");
    setFirstOperand(() => 0);
    setSecondOperand(() => 0);
    setFirstOperandDisplay(() => "0");
    setSecondOperandDisplay(() => "0");
  };

  function clearCalculations() {
    // reset the display (screen captured number), first and second number
    // so that new calculations can be entered without appending to previous data
    setDisplay(() => "");
    setFirstOperand(() => 0);
    setSecondOperand(() => 0);
  }

  function operations() {
    switch (operator) {
      case "+":
        setResult(() => secondOperand + firstOperand);
        break;
      case "-":
        setResult(() => firstOperand - secondOperand);
        break;
      case "x":
        setResult(() => firstOperand * secondOperand);
        break;
      case "/":
        if (secondOperand !== 0) {
          setResult(() => firstOperand / secondOperand);
        } else {
          setResult(() => NaN);
        }
        break;
      default:
        break;
    }
  }

  const handleKeyDown = ({ keyCode, shiftKey }: KeyboardEvent) => {
    console.log(keyCode);
    if (keyCode >= 48 && keyCode <= 57 && !shiftKey) {
      handleDigits(keyCode - 48);
    } else if (keyCode >= 96 && keyCode <= 105) {
      handleDigits(keyCode - 96);
    } else if (keyCode === 107 || (keyCode === 61 && shiftKey)) {
      handleOperations("+");
    } else if (keyCode === 109 || (keyCode === 173 && shiftKey)) {
      handleOperations("-");
    } else if (keyCode === 106 || (keyCode === 56 && shiftKey)) {
      handleOperations("x");
    } else if (keyCode === 111 || keyCode === 191) {
      handleOperations("/");
    } else if (keyCode === 13 || keyCode === 61) {
      handleResult();
    } else if (keyCode === 8 || keyCode === 68) {
      handleDelete();
    } else if (keyCode === 110 || keyCode === 46 || keyCode === 82) {
      handleReset();
    } else if (keyCode === 190) {
      handleDecimal(".");
    } else {
      return;
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", handleKeyDown);
    return () => document.body.removeEventListener("keydown", handleKeyDown);
  });

  useEffect(() => {}, [display]);

  return (
    <main>
      <div
        className={`display border-radius ${
          selectTheme === "light"
            ? "light-colors"
            : selectTheme === "dark"
            ? "dark-colors"
            : "neutral-colors"
        }`}
      >
        <div className="secondDisplay" aria-live="polite">
          {!calc
            ? ""
            : firstOperandDisplay +
              " " +
              selectOperator +
              " " +
              secondOperandDisplay}
        </div>

        <div className="current" aria-live="polite">
          {calc
            ? secondOperandDisplay
            : showResult
            ? result.toLocaleString("en")
            : firstOperandDisplay}
        </div>
      </div>
      <div
        className={`grid border-radius ${
          selectTheme === "light"
            ? "light-colors"
            : selectTheme === "dark"
            ? "dark-colors"
            : "neutral-colors"
        }`}
      >
        <BtnNumbers num={7} handleDigits={() => handleDigits(7)} />
        <BtnNumbers num={8} handleDigits={() => handleDigits(8)} />
        <BtnNumbers num={9} handleDigits={() => handleDigits(9)} />
        <BtnOperator
          operator="DEL"
          doubleSize={false}
          handleOperations={() => handleDelete()}
        />
        <BtnNumbers num={4} handleDigits={() => handleDigits(4)} />
        <BtnNumbers num={5} handleDigits={() => handleDigits(5)} />
        <BtnNumbers num={6} handleDigits={() => handleDigits(6)} />
        <BtnOperator
          operator="+"
          doubleSize={false}
          handleOperations={() => handleOperations("+")}
        />
        <BtnNumbers num={1} handleDigits={() => handleDigits(1)} />
        <BtnNumbers num={2} handleDigits={() => handleDigits(2)} />
        <BtnNumbers num={3} handleDigits={() => handleDigits(3)} />
        <BtnOperator
          operator="-"
          doubleSize={false}
          handleOperations={() => handleOperations("-")}
        />
        <BtnDecimal
          operator="."
          doubleSize={false}
          handleDecimal={() => handleDecimal(".")}
        />
        <BtnNumbers num={0} handleDigits={() => handleDigits(0)} />
        <BtnOperator
          operator="/"
          doubleSize={false}
          handleOperations={() => handleOperations("/")}
        />
        <BtnOperator
          operator="x"
          doubleSize={false}
          handleOperations={() => handleOperations("x")}
        />
        <BtnOperator
          operator="RESET"
          doubleSize={true}
          handleOperations={() => handleReset()}
        />
        <BtnOperator
          operator="="
          doubleSize={true}
          handleOperations={handleResult}
        />
      </div>
    </main>
  );
};

export default Main;
