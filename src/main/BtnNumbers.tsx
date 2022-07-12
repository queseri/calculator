import React from 'react'
interface numberProps {
    num: number,   
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}
const BtnNumbers = ({ num, handleClick }: numberProps) => {
    return (
        <button className="btn numbers" onClick={(event) => handleClick(event)}>
            {num}
        </button>
    )
}

export default BtnNumbers

