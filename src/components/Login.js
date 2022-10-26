import React, {useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import {useTranslation} from "react-i18next";
import {getCookie} from "../helper/apiClient";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginInAsync, setToastShowing} from "../redux/reducers/login/login.thunks";

const Login = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const {isLoading, error, isToastShowing} = useSelector(state => state.login)
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
     /*   let data = new FormData();
        data.append('login', login);
        data.append('password', password);*/
        const user = {
            login: login,
            password: password,
        }
        dispatch(loginInAsync(user));
    };

    useEffect(() => {
        if (isToastShowing) {
            if (error) {
                console.log("!!!!!"+ isToastShowing)
                toast.error(error)
                console.log("222222")
                dispatch(setToastShowing(false));
            } else if (!isLoading) {
                toast.success("Login in is successful!")
                dispatch(setToastShowing(false));
                navigate("/");
            }
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading])

    return (
        <div className="Auth-form-container App">
            <form className="Auth-form" onSubmit={handleSubmit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">{t("Sign In")}</h3>
                    {/*          <div className="text-center">
                            Not registered yet?{" "}
                            <span className="link-primary" onClick={changeAuthMode} style={{cursor: "pointer"}}>
                Sign Up
              </span>
                        </div>*/}
                    <div className="form-group mt-3">
                        <label>{t("Email address")}</label>
                        <input required
                            type="text"
                            className="form-control mt-1"
                            placeholder={t("Enter email")}
                            onChange={e => setLogin(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>{t("Password")}</label>
                        <input required
                            type="password"
                            className="form-control mt-1"
                            placeholder={t("Enter password")}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            {t("Submit")}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )

}
export default Login;