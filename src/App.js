import React from "react"
import Countries from "./containers/Countries"
import Header from "./components/Header"
import "./App.css"

function App() {
  return (
    <div className="App">
      <Header text="HH API" />
      <Countries />
    </div>
  );
}

export default App
