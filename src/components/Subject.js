import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {loadSubjectListAsync} from "../redux/reducers/subject/subject.thunks";
import {loginInAsyncByToken} from "../redux/reducers/login/login.thunks";
import {toast} from "react-toastify";
import {setToastShowing} from "../redux/reducers/common/common.thunks";

const Subject = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {
        currentContest
    } = useSelector(state => state.common);
    const {isLoginIn} = useSelector(state => state.login);
    const {isToastShowing} = useSelector(state => state.common);
    const {isSubjectListLoading, subjects, error} = useSelector(state => state.subjects);

    useEffect(() => {
        console.log(isLoginIn)
        dispatch(loginInAsyncByToken());
        if (!subjects) {
            dispatch(loadSubjectListAsync())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isToastShowing) {
            if (error) {
                toast.error(t(error))
                dispatch(setToastShowing(false));
                if (error === "GBE-ACCESS-001") navigate("/");
            } else if (!isSubjectListLoading) {
                // toast.success(t("Login in is successful!"))
                dispatch(setToastShowing(false));
                // navigate("/");
            }
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubjectListLoading])

    return (
        <div className={"container"}>
            <div className={"row"}>
                <div className={"col-md-10 mx-auto mt-3"}>
                    <h1 className={"col-md-10 mx-auto mb-3"}
                        style={{"textAlign": "center"}}>{t("Subjects")}</h1>
                    <table className={"table table-hover"}>
                        <thead className={"text-white bg-dark text-left"}>
                        <tr>
                            <th scope={"col"}>#</th>
                            <th scope={"col"}>{t("Title")}</th>
                        </tr>
                        </thead>
                        <tbody style={{textAlign: "left"}}>
                        {subjects && subjects.map((subject, id) => (
                            <tr key={id}>
                                <td>{id + 1}</td>
                                <td>{subject.name}</td>
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