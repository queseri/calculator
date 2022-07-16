import React, { useContext, useState } from 'react'
import { DataContext } from '../context/Context'
import BtnDecimal from './BtnDecimal'
import BtnNumbers from './BtnNumbers'
import BtnOperator from './BtnOperator'

const Main = () => {
    const { selectTheme } = useContext(DataContext)
    const [firstOperand, setFirstOperand] = useState<number>(0)
    const [secondOperand, setSecondOperand] = useState<number>(0)
    const [calc, setCalc] = useState<boolean>(false)
    const [selectOperator, setSelectOperator] = useState<string>('')
    const [result, setResult] = useState<number>(0)
    const [operator, setOperator] = useState<string>('+')
    const [display, setDisplay] = useState<string>('0')
    const [showResult, setShowResult] = useState<boolean>(false)

    function handleDigits(id: number) {
        // the screen will show either the result of calculation when showResult is true or
        // the number being entered when showResult is false. Hence at start showResult is false
        console.log(`calculations has been set to 1: ${calc}`)
        if (showResult) {
            setResult(() => 0)
            setShowResult(() => false)
            // clearCalculations();
        }
        // display => number to be displayed on the screen. A click on a number button will 
        // add another number to the display. display is a string.
        if (display.length > 12) {
            return
        }
        setDisplay(() => display + id)
        // calc is false at the start, any numbers entered when calc is false will be added to the
        // string display - converted to a number by setFirstOperand. When calc is true - triggered by
        // a click on any of the operators, then the collection of numbers will become secondOperand
        if (!calc) {
            setFirstOperand(() => Number(display + id))
        } else {
            setSecondOperand(() => Number(display + id))
        }
    }

    const handleOperations = (id: string) => {
        setOperator(() => id);
        setSelectOperator(() => id);
        setDisplay(() => "");
        setCalc(() => true);
    }

    const handleResult = () => {
        if (!showResult) {
            setShowResult(showResult => !showResult);
        }
        if (calc) {
            setCalc(calc => !calc);
            operations();
            clearCalculations();
        } else {
            return
        }

    }

    const handleDecimal = (id: string) => {

        if (display.indexOf('.') === -1) {
            setDisplay(display => display + id)
            if (!calc) {
                setFirstOperand(() => Number(display + id))
            } else {
                setSecondOperand(() => Number(display + id))
            }
        } else {
            return
        }

    }
    const handleDelete = () => {
        if (display.length < 1) {
            return;
        } else {
            setDisplay(display => display.slice(0, -1))
            if (!calc) {
                setFirstOperand(() => Number(display.slice(0, -1)))
            } else {
                setSecondOperand(() => Number(display.slice(0, -1)))
            }
        }
    }

    const handleReset = () => {
        setDisplay(() => ("0"))
        setFirstOperand(() => 0)
        setSecondOperand(() => 0)
        setCalc(() => false)
        setSelectOperator(() => "")
        setResult(() => 0)
        setOperator(() => "")
        setShowResult(() => false)
    }

    function clearCalculations() {
        // reset the display (screen captured number), first and second number
        // so that new calculations can be entered without appending to previous data
        setDisplay(() => "");
        setFirstOperand(() => 0);
        setSecondOperand(() => 0);
    }

    function operations() {
        switch (operator) {
            case '+':
                setResult(() => secondOperand + firstOperand);
                console.log(result)
                break;
            case '-':
                setResult(() => firstOperand - secondOperand);
                break;
            case 'x':
                setResult(() => firstOperand * secondOperand)
                break;
            case '/':
                if (secondOperand !== 0) {
                    setResult(() => firstOperand / secondOperand)
                } else {
                    setResult(() => NaN)
                }
                break;
            default:
                break;
        }

    }

    return (
        <main>
            <div className={`display border-radius ${selectTheme === 'two' ?
                'secondary-colors' :
                selectTheme === 'three' ?
                    'tertiary-colors' :
                    'main-colors'}`}>

                <div className='secondDisplay' aria-live='polite'>
                    {!calc ?
                        "" :
                        firstOperand + " " + selectOperator + " " + secondOperand}
                </div>

                <div className='current' aria-live='polite'>

                    {calc ?
                        secondOperand : showResult ?
                            result.toLocaleString("en") :
                            firstOperand}
                </div>
            </div>
            <div className={`grid border-radius ${selectTheme === 'two' ?
                'secondary-colors' :
                selectTheme === 'three' ?
                    'tertiary-colors' :
                    'main-colors'}`}>
                <BtnNumbers num={7} handleDigits={() => handleDigits(7)} />
                <BtnNumbers num={8} handleDigits={() => handleDigits(8)} />
                <BtnNumbers num={9} handleDigits={() => handleDigits(9)} />
                <BtnOperator operator="DEL" doubleSize={false} handleOperations={() => handleDelete()} />
                <BtnNumbers num={4} handleDigits={() => handleDigits(4)} />
                <BtnNumbers num={5} handleDigits={() => handleDigits(5)} />
                <BtnNumbers num={6} handleDigits={() => handleDigits(6)} />
                <BtnOperator operator="+" doubleSize={false} handleOperations={() => handleOperations("+")} />
                <BtnNumbers num={1} handleDigits={() => handleDigits(1)} />
                <BtnNumbers num={2} handleDigits={() => handleDigits(2)} />
                <BtnNumbers num={3} handleDigits={() => handleDigits(3)} />
                <BtnOperator operator="-" doubleSize={false} handleOperations={() => handleOperations("-")} />
                <BtnDecimal operator="." doubleSize={false} handleDecimal={() => handleDecimal(".")} />
                <BtnNumbers num={0} handleDigits={() => handleDigits(0)} />
                <BtnOperator operator="/" doubleSize={false} handleOperations={() => handleOperations("/")} />
                <BtnOperator operator="x" doubleSize={false} handleOperations={() => handleOperations("x")} />
                <BtnOperator operator="RESET" doubleSize={true} handleOperations={() => handleReset()} />
                <BtnOperator operator="=" doubleSize={true} handleOperations={handleResult} />
            </div>
        </main>
    )
}

export default Main