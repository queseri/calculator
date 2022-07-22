import React from 'react'
interface Operations {
    operator: string,
    doubleSize: boolean,
    handleDecimal: (event: React.MouseEvent<HTMLButtonElement>) => void
}
const BtnDecimal = ({ operator, doubleSize, handleDecimal }: Operations) => {
    return (
        <button className={`btn operators ${doubleSize ? "double-size" : ""}`} onClick={handleDecimal}>
            {operator}
        </button>
    )
}

export default BtnDecimal