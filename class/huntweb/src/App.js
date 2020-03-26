import React, { Component } from "react";
import Routes from "./routes/index";

import "./components/styles.css";
import Header from "./components/Header";

const App = () => (
  <div className="App">
    <Header />
    <Routes />
  </div>
);

export default App;
