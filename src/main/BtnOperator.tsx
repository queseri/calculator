import React from 'react'
interface Operations {
    operator: string,
    doubleSize: boolean,
    handleOps: (evt: React.MouseEvent<HTMLButtonElement>) => void
}
const BtnOperator = ({ operator, doubleSize, handleOps }: Operations) => {
    return (
        <button className={`btn operators ${doubleSize ? "double-size" : ""}`} onClick={handleOps}>
            {operator}
        </button>
    )
}

export default BtnOperator