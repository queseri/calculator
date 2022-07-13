import React, { useContext, useState, useEffect } from 'react'
import { DataContext } from '../context/Context'
import BtnNumbers from './BtnNumbers'
import BtnOperator from './BtnOperator'

const Main = () => {
    const { selectTheme } = useContext(DataContext)
    const [currentOperand, setCurrentOperand] = useState<number>(0)
    // const [previousOperand, setPreviousOperand] = useState<number>(0)
    //  const [calc, setCalc] = useState<boolean>(false)
    //  const [newCalculations, setNewCalculations] = useState<boolean>(false)
    //  const [result, setResult] = useState<number>(0)
    const [operator, setOperator] = useState<string>('+')
    const [display, setDisplay] = useState<string>('0')

    /*
    const checkLeadingZeroes = (operand: number, setOperand: (arg0: () => number) => void) => {
        if (operand.toString().length > 1 && (String(operand)[0] === '0')) {
            setOperand(() => Number(String(operand).substring(1)))
        }
    }
*/
    useEffect(() => {

    }, [currentOperand])

    function handleClick(id: number) {
        setDisplay(() => display + id)
        setCurrentOperand(() => Number(display + id))
    }

    function handleOps(id: string) {
        setOperator(() => id)
        //  operations()
    }

    /*
        function operations() {
            switch (operator) {
                case '+':              
                    setResult(() => previousOperand + currentOperand)
                    setDisplay("")
                    break;
                case '-':
                    setResult(() => currentOperand - previousOperand)
                    break;
                case 'x':
                    setResult(() => currentOperand * previousOperand)
                    break;
                case '/':
                    if (previousOperand !== 0) {
                        setResult(() => currentOperand / previousOperand)
                    } else {
                        setResult(() => NaN)
                    }
                    break;
                case "=":
                   
                    break;
                default:
                    break;
            }
           // setCalc(true)
        }
    */
   /*
    const checkOperator = () => {
        if (operator === '/' || operator === '+' || operator === '-' || operator === "x") {
            return true
        } else {
            return false
        }
    }
*/
    return (
        <main>
            <div className={`display border-radius ${selectTheme === 'two' ?
                'secondary-colors' :
                selectTheme === 'three' ?
                    'tertiary-colors' :
                    'main-colors'}`}>
                <div className='previousOperand'>
                    {operator}
                </div>
                <div className='current'>{currentOperand}</div>
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
                <BtnOperator operator="." doubleSize={false} handleOps={() => handleOps(".")} />
                <BtnNumbers num={0} handleClick={() => handleClick(0)} />
                <BtnOperator operator="/" doubleSize={false} handleOps={() => handleOps("/")} />
                <BtnOperator operator="x" doubleSize={false} handleOps={() => handleOps("x")} />
                <BtnOperator operator="RESET" doubleSize={true} handleOps={() => handleOps("RESET")} />
                <BtnOperator operator="=" doubleSize={true} handleOps={() => handleOps("=")} />
            </div>
        </main>
    )
}

export default Main