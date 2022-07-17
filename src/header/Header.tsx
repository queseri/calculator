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
        <div className="theme neutral-scheme">
          <input type="radio"
            name="theme"
            id="neutral-theme"
            value="neutral"
            checked={selectTheme === 'neutral'}
            onChange={onChange} />
          <label className="label" htmlFor="neutral-theme">1</label>
        </div>
        <div className="theme light-scheme">
          <input type="radio"
            name="theme"
            id="light-theme"
            value="light"
            checked={selectTheme === 'light'}
            onChange={onChange} />
          <label className="label" htmlFor="light-theme">2</label>
        </div>
        <div className="theme dark-scheme">
          <input type="radio"
            name="theme"
            id="dark-theme"
            value="dark"
            checked={selectTheme === 'dark'} onChange={onChange} />
          <label className="label" htmlFor="dark-theme">3</label>
        </div>
      </fieldset>
    </header>
  )
}

export default Header