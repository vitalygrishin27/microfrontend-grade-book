import React from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";

const Navbar = () => {
    const {t, i18n} = useTranslation()
    const dispatch = useDispatch()
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    }

    return (
        <div className={"col-md-12 bg-bg-light py-2"}>
            <nav className="navbar navbar-light bg-opacity-100">
                <Link to="/" className="navbar-brand mx-5">{t("Main")}</Link>

                <div className="mx-3" style={{"textAlign": "right", "display":"inline-block"}}>
                    <Link to={"/members"} className={"btn btn-success text-light"}>{t("Members")}</Link>
                    <div className="mx-3" style={{"display":"inline-block"}}>
                        <select className="form-select" id={"language"} onChange={(e) => changeLanguage(e.target.value)} defaultValue={"UA"}>
                            <option value={"ua"}>UA</option>
                            <option value={"en"}>EN</option>
                            <option value={"ru"}>RU</option>
                        </select>
                    </div>
                </div>
            </nav>
        </div>

    );
};
export default Navbar;