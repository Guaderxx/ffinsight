import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import Header from "./components/Header.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <React.StrictMode>
            <Header />
            <Routes>
                <Route path="/" element={<App />} />
            </Routes>
        </React.StrictMode>,
    </BrowserRouter>
  );
