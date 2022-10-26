import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const Subject = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {
        currentContest
    } = useSelector(state => state.common);
    const {isLoginIn} = useSelector(state => state.login);

    useEffect(() => {
        if (!isLoginIn || !currentContest) {
            navigate("/")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={"container"}>
            <div className={"row"}>
                <div className={"col-md-10 mx-auto mt-3"}>
                    <h1 className={"col-md-10 mx-auto mb-3"}
                        style={{"textAlign": "center"}}>{t("Categories")}</h1>
                    <table className={"table table-hover"}>
                        <thead className={"text-white bg-dark text-left"}>
                        <tr>
                            <th scope={"col"}>#</th>
                            <th scope={"col"}>{t("Title")}</th>
                            <th scope={"col"}>{t("Description")}</th>
                            <th scope={"col"}>{t("Criteria")}</th>
                        </tr>
                        </thead>
                        <tbody style={{textAlign: "left"}}>
                        {currentContest && currentContest.categories && currentContest.categories.map((category, id) => (
                            <tr key={id}>
                                <td>{id + 1}</td>
                                <td>{category.name}</td>
                                <td>{category.description}</td>
                                <td>
                                    <table>
                                        <tbody>
                                        {category.criteria && category.criteria.map((criteria, id) => (

                                            <tr key={id}>
                                                <td>{criteria.name} {criteria.description ? '(' + criteria.description + ')' : ''}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}
export default Subject