import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {loginInAsyncByToken} from "../redux/reducers/login/login.thunks";
import {toast} from "react-toastify";
import {setToastShowing} from "../redux/reducers/common/common.thunks";
import {Spinner} from "react-bootstrap";
import {rootUrl} from "../App";
import Table from 'react-bootstrap/Table';
import {loadSchedulerForTeacher} from "../redux/reducers/scheduler/scheduler.thunks";
import Switch from "react-switch";

const Subject = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {isToastShowing, commonError, commonMessage} = useSelector(state => state.common);
    const [showSubjects, setShowSubjects] = useState(false);
    const {
        isDataLoading,
        schedulerForTeacher,
    } = useSelector(state => state.scheduler);

    useEffect(() => {
        dispatch(loginInAsyncByToken());
        dispatch(loadSchedulerForTeacher())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isToastShowing) {
            if (commonError) {
                if (!(t(commonError)).startsWith("GBE")) toast.error(t(commonError))
                dispatch(setToastShowing(false));
                if (commonError === "GBE-ACCESS-001") navigate(rootUrl + "/");
            } else if (commonMessage) {
                toast.info(t(commonMessage))
                dispatch(setToastShowing(false));
            }
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [commonMessage, commonError])

    return (
        <div className={"container"}>
            <div className={"row"}>
                <div className={"col-md-10 mx-auto mt-3"}>
                    <h1 className={"pageTitle col-md-10 mx-auto mb-3"}
                    >{t("Scheduler")}</h1>

                    <label className={"my-2 mx-2"}>{t("Show subjects")}<Switch className={"mx-2"}
                                                                               onChange={setShowSubjects}
                                                                               checked={showSubjects}/></label>

                    {isDataLoading &&
                        <div style={{"textAlign": "center"}}><Spinner
                            as="span"
                            animation="border"
                            size="lg"
                            role="status"
                            aria-hidden="true"
                            variant="dark"/>
                        </div>
                    }
                    {schedulerForTeacher && schedulerForTeacher.length < 1 && <tr>
                        <td colSpan={3} style={{textAlign: "center"}}>{t("Nothing to show")}</td>
                    </tr>}
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>""</th>
                            <th>{t("MONDAY")}</th>
                            <th>{t("TUESDAY")}</th>
                            <th>{t("WEDNESDAY")}</th>
                            <th>{t("THURSDAY")}</th>
                            <th>{t("FRIDAY")}</th>
                            <th>{t("SATURDAY")}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {schedulerForTeacher && schedulerForTeacher.map((row, id) => (
                            <tr key={id}>
                                <td>{id + 1}</td>
                                <td>{row[0] !== null && row[0].subjectBom.name !== "Free" ? row[0].clazzBom.name + (showSubjects ? " (" + row[0].subjectBom.name + ")" : "") : ""}</td>
                                <td>{row[1] !== null && row[1].subjectBom.name !== "Free" ? row[1].clazzBom.name + (showSubjects ? " (" + row[1].subjectBom.name + ")" : ""): ""}</td>
                                <td>{row[2] !== null && row[2].subjectBom.name !== "Free" ? row[2].clazzBom.name + (showSubjects ? " (" + row[2].subjectBom.name + ")" : ""): ""}</td>
                                <td>{row[3] !== null && row[3].subjectBom.name !== "Free" ? row[3].clazzBom.name + (showSubjects ? " (" + row[3].subjectBom.name + ")" : ""): ""}</td>
                                <td>{row[4] !== null && row[4].subjectBom.name !== "Free" ? row[4].clazzBom.name + (showSubjects ? " (" + row[4].subjectBom.name + ")" : ""): ""}</td>
                                <td>{row[5] !== null && row[5].subjectBom.name !== "Free" ? row[5].clazzBom.name + (showSubjects ? " (" + row[5].subjectBom.name + ")" : ""): ""}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>

    )
}
export default Subject