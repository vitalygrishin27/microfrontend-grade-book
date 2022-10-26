import React from "react";
import {ToastContainer} from "react-toastify";
import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";

const App = () => {
    return (
        <div className="App">
            <ToastContainer position="bottom-left"/>
            <Navbar/>
            <Routes>
                <Route path="/*" element={<Login/>}/>
            </Routes>
        </div>
    );
}

export default App;
