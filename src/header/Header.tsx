import React, { useContext, useEffect } from 'react'
import { DataContext } from '../context/Context'

const Header = () => {
  const { selectTheme, setSelectTheme } = useContext(DataContext)

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(selectTheme))
  }, [selectTheme])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setSelectTheme) {
      setSelectTheme(e.target.value)
    }
  }
  return (
    <header className={`header`}>
      <h1>calc</h1>
      <fieldset className="theme-control" >
        <legend className="theme-header">theme</legend>
        <div className="theme theme-1">
          <input type="radio"
            name="theme"
            id="first-theme"
            value="one"
            checked={selectTheme === 'one'}
            onChange={onChange} />
          <label className="label" htmlFor="first-theme">1</label>
        </div>
        <div className="theme theme-2">
          <input type="radio"
            name="theme"
            id="second-theme"
            value="two"
            checked={selectTheme === 'two'}
            onChange={onChange} />
          <label className="label" htmlFor="second-theme">2</label>
        </div>
        <div className="theme theme-3">
          <input type="radio"
            name="theme"
            id="third-theme"
            value="three"
            checked={selectTheme === 'three'} onChange={onChange} />
          <label className="label" htmlFor="third-theme">3</label>
        </div>
      </fieldset>
    </header>
  )
}

export default Header