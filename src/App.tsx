import React, { useContext } from 'react';
import Header from './header/Header';
import { DataContext } from './context/Context';
import './App.css';

function App() {
  const { selectTheme } = useContext(DataContext)
  return (
    <div className={` wrapper  ${selectTheme === 'two' ?
      'secondary-colors' :
      selectTheme === 'three' ?
        'tertiary-colors' :
        'main-colors'} `}>
      <div className="App">
        <Header />
      </div>
    </div>
  );
}

export default App;