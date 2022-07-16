import React from 'react'
interface Operations {
    operator: string,
    doubleSize: boolean,
    handleOperations: (evt: React.MouseEvent<HTMLButtonElement>) => void
}
const BtnOperator = ({ operator, doubleSize, handleOperations }: Operations) => {
    return (
        <button className={`btn operators ${doubleSize ? "double-size" : ""}`} onClick={handleOperations}>
            {operator}
        </button>
    )
}

export default BtnOperator