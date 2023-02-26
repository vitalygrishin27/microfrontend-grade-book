import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {loginInAsyncByToken} from "../redux/reducers/login/login.thunks";
import {toast} from "react-toastify";
import {setToastShowing} from "../redux/reducers/common/common.thunks";
import {Spinner} from "react-bootstrap";
import "../FullScheduler.css";
import {rootUrl} from "../App";
import Switch from "react-switch";
import {DAYS, fullSchedulerMaxLessonsPerDay} from "../types/types";
import {uniqueId} from "lodash/util";
import {loadFullScheduler} from "../redux/reducers/fullScheduler/fullScheduler.thunks";

const FullScheduler = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {isToastShowing, commonError, commonMessage} = useSelector(state => state.common);
    const [showSubjects, setShowSubjects] = useState(false);
    const {
        isFullSchedulerLoading,
        fullScheduler,
    } = useSelector(state => state.fullScheduler);

    useEffect(() => {
        dispatch(loginInAsyncByToken());
        dispatch(loadFullScheduler());
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
            <div>
                <div>
                    <h1 className={"pageTitle col-md-10 mx-auto mb-3"}>{t("Full scheduler")}</h1>

                    <label className={"my-2 mx-2"}>{t("Show subjects")}<Switch className={"mx-2"}
                                                                               onChange={setShowSubjects}
                                                                               checked={showSubjects}/></label>

                    {isFullSchedulerLoading &&
                        <div style={{"textAlign": "center"}}><Spinner
                            as="span"
                            animation="border"
                            size="lg"
                            role="status"
                            aria-hidden="true"
                            variant="dark"/>
                        </div>
                    }
                    {fullScheduler && fullScheduler.length < 1 && <table>
                        <tbody>
                        <tr>
                            <td colSpan={3} style={{textAlign: "center"}}>{t("Nothing to show")}</td>
                        </tr>
                        </tbody>
                    </table>}
                    <div role="region" aria-labelledby="caption1" tabIndex="0">
                        <table className={"table1"} style={{height: "50%"}}>
                            <thead>
                            <tr>
                                <th className={"centerCell"}>{t("Teacher")}</th>
                                {DAYS.map((day, index) => {
                                    return (<td key={uniqueId("day")} className={"centerCell"}
                                                colSpan={fullSchedulerMaxLessonsPerDay.length}>{t(day)}</td>)
                                })}
                            </tr>
                            <tr>
                                <td className={"centerCell"} rowSpan={2}/>
                                {DAYS.map((day, index) => {
                                    const gh = [];
                                    for (let i = 0; i < fullSchedulerMaxLessonsPerDay.length; i++) {
                                        gh.push(<th key={uniqueId("lesson")}
                                                    className={"centerCell"}>{t("Lesson") + " " + t(i + 1)}</th>)
                                    }
                                    return gh;
                                })}
                            </tr>
                            <tr>
                                {DAYS.map((day, index) => {
                                    const gh = [];
                                    for (let i = 0; i < fullSchedulerMaxLessonsPerDay.length; i++) {
                                        gh.push(<td key={uniqueId("class")} className={"centerCell"}
                                                    style={{whiteSpace: "nowrap"}}>{t("Class/Room")}</td>)
                                    }
                                    return gh;
                                })}
                            </tr>
                            </thead>
                            <tbody>


                            {fullScheduler && fullScheduler.map((teacherData, index) => {

                                return (
                                    <tr key={index}>
                                        <td key={uniqueId("teacher")}>{teacherData.teacherBom.lastName + " " + teacherData.teacherBom.firstName}</td>
                                        {teacherData && teacherData.itemList.map((itemList, index) => {
                                            return (
                                                <td key={index} className={itemList.length>1?"tdHighlighted":""}>
                                                    {itemList.map((item) => {
                                                        return (
                                                            <div
                                                                key={uniqueId(itemList.toString())}>{item.clazzBom ? item.clazzBom.name : ""}
                                                                {showSubjects ? (item.subjectBom ? " (" + item.subjectBom.name + ")" : "") : ""}
                                                            </div>
                                                        )
                                                    })}
                                                </td>
                                            )


                                        })}


                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FullScheduler