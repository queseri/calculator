import React, { useContext } from 'react'
import { DataContext } from '../context/Context'
import BtnNumbers from './BtnNumbers'
import BtnOperator from './BtnOperator'

const Main = () => {
    const { selectTheme } = useContext(DataContext)
    return (
        <main>
            <div className={`display border-radius ${selectTheme === 'two' ?
                'secondary-colors' :
                selectTheme === 'three' ?
                    'tertiary-colors' :
                    'main-colors'}`}>
               <span>399,981</span>
            </div>
            <div className={`grid border-radius ${selectTheme === 'two' ?
                'secondary-colors' :
                selectTheme === 'three' ?
                    'tertiary-colors' :
                    'main-colors'}`}>
                <BtnNumbers num={7} />
                <BtnNumbers num={8} />
                <BtnNumbers num={9} />
                <BtnOperator operator="DEL" doubleSize={false} />
                <BtnNumbers num={4} />
                <BtnNumbers num={5} />
                <BtnNumbers num={6} />
                <BtnOperator operator="+" doubleSize={false} />
                <BtnNumbers num={1} />
                <BtnNumbers num={2} />
                <BtnNumbers num={3} />
                <BtnOperator operator="-" doubleSize={false} />
                <BtnOperator operator="." doubleSize={false} />
                <BtnNumbers num={0} />
                <BtnOperator operator="/" doubleSize={false} />
                <BtnOperator operator="x" doubleSize={false} />
                <BtnOperator operator="RESET" doubleSize={true} />
                <BtnOperator operator="=" doubleSize={true} />
            </div>
        </main>
    )
}

export default Main