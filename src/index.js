import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css"
import {BrowserRouter as Router} from "react-router-dom";
import {t} from "i18next";
import {Provider} from "react-redux";
import configureStore from "./redux/store/configureStore";

import "./i18n"

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Suspense fallback={<div>{t("Loading...")}</div>}/>
        <Router>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
);
