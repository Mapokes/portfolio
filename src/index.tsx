import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/layout.scss";

const container = document.getElementById("root")!;
const core = ReactDOM.createRoot(container);
core.render(<App />);
