import React, { useContext } from "react";
import Header from "./header/Header";
import { DataContext } from "./context/Context";
import Main from "./main/Main";
import { ToastContainer } from "react-toastify";

function App() {
  const { selectTheme } = useContext(DataContext);
  return (
    <div
      className={`wrapper  ${
        selectTheme === "light"
          ? "light-colors"
          : selectTheme === "dark"
          ? "dark-colors"
          : "neutral-colors"
      } `}
    >
      <ToastContainer position="top-center" limit={1} />
      <div className="app">
        <Header />
        <Main />
      </div>
    </div>
  );
}

export default App;
