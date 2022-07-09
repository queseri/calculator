import React from 'react'
interface numberProps {
    num: number
}
const BtnNumbers = ({ num }: numberProps) => {
    return (
        <button className="btn numbers">
            {num}
        </button>
    )
}

export default BtnNumbers