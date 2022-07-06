import React, { useState } from 'react'

const Header = () => {
  const [selectTheme, setSelectTheme] = useState<String>('one')
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectTheme(e.target.value)
  }
  return (
    <header className={`header ${selectTheme === 'two' ? 'secondary-colors' : selectTheme === 'three' ? 'tertiary-colors' : 'main-colors'} `}>
      <h1>Calc</h1>
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