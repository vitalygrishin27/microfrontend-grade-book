import React from "react";
import {ToastContainer} from "react-toastify";
import "./App.css";
import {Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Subject from "./components/Subject";

const App = () => {
    return (
        <div className="App">
            <ToastContainer position="bottom-left"/>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/subjects" element={<Subject/>}/>
            </Routes>
        </div>
    );
}

export default App;
