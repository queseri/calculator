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

    function handleClick(id: number) {
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

    const handleOps = (id: string) => {
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
        console.log(id)
        if (display.indexOf('.') === -1) {
            setDisplay(() => display + id)
            if (!calc) {
                setFirstOperand(() => Number(display + id))
            } else {
                setSecondOperand(() => Number(display + id))
            }
        } else {
            return
        }

    }

    function clearCalculations() {
        // reset the display (screen captured number), first and second number
        // so that new calculations can be entered without appending to previous data
        setDisplay(() => "");
        setFirstOperand(() => 0);
        setSecondOperand(() => 0);
    }

    function operations() {
        console.log(`calculations has been set to 2: ${calc}`)
        console.log(` ${firstOperand}: ${operator} ${secondOperand} = ${result}`)
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
                <div className='secondDisplay'>
                    {!calc ? "" : firstOperand + selectOperator + secondOperand}
                </div>
                <div className='current'>{calc ? secondOperand : showResult ? result : firstOperand}</div>
            </div>
            <div className={`grid border-radius ${selectTheme === 'two' ?
                'secondary-colors' :
                selectTheme === 'three' ?
                    'tertiary-colors' :
                    'main-colors'}`}>
                <BtnNumbers num={7} handleClick={() => handleClick(7)} />
                <BtnNumbers num={8} handleClick={() => handleClick(8)} />
                <BtnNumbers num={9} handleClick={() => handleClick(9)} />
                <BtnOperator operator="DEL" doubleSize={false} handleOps={() => handleOps("DEL")} />
                <BtnNumbers num={4} handleClick={() => handleClick(4)} />
                <BtnNumbers num={5} handleClick={() => handleClick(5)} />
                <BtnNumbers num={6} handleClick={() => handleClick(6)} />
                <BtnOperator operator="+" doubleSize={false} handleOps={() => handleOps("+")} />
                <BtnNumbers num={1} handleClick={() => handleClick(1)} />
                <BtnNumbers num={2} handleClick={() => handleClick(2)} />
                <BtnNumbers num={3} handleClick={() => handleClick(3)} />
                <BtnOperator operator="-" doubleSize={false} handleOps={() => handleOps("-")} />
                <BtnDecimal operator="." doubleSize={false} handleDecimal={() => handleDecimal(".")} />
                <BtnNumbers num={0} handleClick={() => handleClick(0)} />
                <BtnOperator operator="/" doubleSize={false} handleOps={() => handleOps("/")} />
                <BtnOperator operator="x" doubleSize={false} handleOps={() => handleOps("x")} />
                <BtnOperator operator="RESET" doubleSize={true} handleOps={() => handleOps("RESET")} />
                <BtnOperator operator="=" doubleSize={true} handleOps={handleResult} />
            </div>
        </main>
    )
}

export default Main