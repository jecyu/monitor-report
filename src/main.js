import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
window.root =
  window.root || ReactDOM.createRoot(document.getElementById("app"));

const render = () => {
  window.root.render(<App />);
};

render();
