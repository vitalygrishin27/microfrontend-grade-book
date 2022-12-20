import React, {useEffect} from "react";
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

const Subject = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {isToastShowing, commonError, commonMessage} = useSelector(state => state.common);
    const {
        isDataLoading,
        schedulerForTeacher,
    } = useSelector(state => state.scheduler);

    useEffect(() => {
        dispatch(loginInAsyncByToken());
        dispatch(loadSchedulerForTeacher())
        console.log(schedulerForTeacher)
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
                            <th></th>
                            <th>{t("MONDAY")}</th>
                            <th>{t("TUESDAY")}</th>
                            <th>{t("WEDNESDAY")}</th>
                            <th>{t("THURSDAY")}</th>
                            <th>{t("FRIDAY")}</th>
                            <th>{t("SATURDAY")}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td colSpan={2}>Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>

    )
}
export default Subject