import React from 'react'
interface Operations {
    operator: string,
    doubleSize: boolean
}
const BtnOperator = ({ operator, doubleSize  }: Operations) => {
  return (
    <button className={`btn operators ${doubleSize ? "double-size" : ""}`}>{operator}</button>
  )
}

export default BtnOperator