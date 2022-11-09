import React from "react";
import {ToastContainer} from "react-toastify";
import "./App.css";
import {Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Subject from "./components/Subject";
import Clazz from "./components/Clazz";
import User from "./components/User";

const App = () => {
    return (
        <div className="App">
            <ToastContainer position="bottom-left"/>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/classes" element={<Clazz/>}/>
                <Route path="/subjects" element={<Subject/>}/>
                <Route path="/users" element={<User/>}/>
            </Routes>
        </div>
    );
}

export default App;
