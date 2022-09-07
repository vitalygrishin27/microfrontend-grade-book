import React from "react";
import {ToastContainer} from "react-toastify";
import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/Login";
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
