import React from 'react'
interface numberProps {
    num: number,   
    handleDigits: (event: React.MouseEvent<HTMLButtonElement>) => void
}
const BtnNumbers = ({ num, handleDigits }: numberProps) => {
    return (
        <button className="btn numbers" onClick={handleDigits}>
            {num}
        </button>
    )
}

export default BtnNumbers

