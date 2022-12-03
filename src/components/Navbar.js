import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {loginOut} from "../redux/reducers/login/login.thunks";
import {AccessLevelFilter} from "../types/types";
import {rootUrl} from "../App";

const Navbar = () => {
    const navigate = useNavigate();
    const {t, i18n} = useTranslation()
    const dispatch = useDispatch()
    const {isLoginIn, token} = useSelector(state => state.login);
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    }

    const handleLogOut = () => {
        dispatch(loginOut());
        document.cookie = "grade_book_token=" + escape("") + "; expires=Thu, 01 Jan 1970 00:00:01 GMT"
        navigate({rootUrl}+"/")
    }

    return (
        <div className={"col-md-12 bg-bg-light py-2"}>
            <nav className="navbar navbar-light bg-opacity-100">
                <Link to={rootUrl+"/"} className="navbar-brand mx-5">{t("Main")}</Link>

                <div className="mx-3" style={{"textAlign": "right", "display": "inline-block"}}>
                    {/*{isLoginIn &&  <Link to={"/members"} className={"btn btn-success text-light"}>{t("Users")}</Link>}&nbsp;*/}
                    {isLoginIn && token.accessLevel===AccessLevelFilter.ADMIN && <Link to={rootUrl+"/classes"} className={"btn btn-success text-light"}>{t("Classes")}</Link>}
                    {isLoginIn && token.accessLevel===AccessLevelFilter.ADMIN &&<Link to={rootUrl+"/users"} className={"btn btn-success text-light"}>{t("Users")}</Link>}
                    {isLoginIn && token.accessLevel===AccessLevelFilter.ADMIN &&
                        <Link to={rootUrl+"/subjects"} className={"btn btn-success text-light"}>{t("Subjects")}</Link>}

                    <div className="mx-3" style={{"display": "inline-block"}}>
                        <select className="form-select" id={"language"} onChange={(e) => changeLanguage(e.target.value)}
                                defaultValue={"UA"}>
                            <option value={"ua"}>UA</option>
                            <option value={"en"}>EN</option>
                            <option value={"ru"}>RU</option>
                        </select>
                    </div>
                    {isLoginIn && <button className={"btn btn-danger text-light"}
                                          onClick={() => handleLogOut()}>
                        <div>({token.firstName}) {t("Login out")}</div>
                    </button>}
                </div>
            </nav>
        </div>

    );
};
export default Navbar;