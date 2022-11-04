import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginInAsync, loginInAsyncByToken} from "../redux/reducers/login/login.thunks";
import {serviceVersionAsync, setToastShowing} from "../redux/reducers/common/common.thunks";
import packageJson from '../../package.json';

const Login = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const {isLoginIn, isLoading, error, token} = useSelector(state => state.login)
    const {isToastShowing, serviceVersion} = useSelector(state => state.common)
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
        console.log(packageJson.version); // "1.0.0"
        dispatch(serviceVersionAsync())
        dispatch(loginInAsyncByToken());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (isToastShowing) {
            if (error) {
                toast.error(t(error))
                dispatch(setToastShowing(false));
            } else if (!isLoading) {
                toast.success(t("Login in is successful!"))
                dispatch(setToastShowing(false));
                navigate("/");
            }
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading])

    return (
        <div className="Auth-form-container App">
            <form className="Auth-form" onSubmit={handleSubmit}>
                {!isLoginIn ? <div className="Auth-form-content">
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
                            <button disabled={isLoading} type="submit" className="btn btn-primary">
                                {t("Submit")}
                            </button>
                        </div>
                        <div>
                            <div style={{"textAlign": "right"}}>{t("UI version")}&nbsp;{packageJson.version}</div>
                            <div style={{"textAlign": "right"}}>{t("Service version")}&nbsp;{serviceVersion}</div>
                        </div>
                    </div>
                    : <div><h3 className="Auth-form-title">{t("Hello")}{token.firstName}</h3></div>}
            </form>
        </div>
    )

}
export default Login;