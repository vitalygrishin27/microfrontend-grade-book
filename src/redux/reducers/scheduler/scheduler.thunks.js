import actions from "./scheduler.actions"
import {getCookie} from "../../../helper/apiClient";
import commonActions from "../common/common.actions";
import SchedulerService from "../../../service/scheduler.service";

export const dataLoadingStarts = (clazzOid: number) => (dispatch) => {
    dispatch(actions.dataLoadingStarts())
    SchedulerService.loadScheduler(clazzOid, getCookie("grade_book_token"))
        .then(response => {
            dispatch(actions.dataLoadingSuccess(response.data));
        })
        .catch(error => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(commonActions.setCommonError(error.response.data ? error.response.data.errorCode : error.message))
            dispatch(actions.dataLoadingError())
        })
};
export const createSchedulerAsync = (scheduler) => (dispatch) => {
    dispatch(actions.schedulerCreationStart())
    SchedulerService.createScheduler(scheduler, getCookie("grade_book_token"))
        .then(response => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(commonActions.setCommonMessage("Scheduler was saved"))
            dispatch(actions.schedulerCreationSuccess());
            dispatch(actions.dataLoadingSuccess(response.data));
        })
        .catch(error => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(commonActions.setCommonError(error.response.data ? error.response.data.errorCode : error.message))
            dispatch(actions.schedulerCreationError())
        })
};

export const clearBoard = (columns) => (dispatch) => {
    dispatch(actions.clearBoard(columns))
};

export const loadSchedulerForTeacher = () => (dispatch) => {
    dispatch(actions.loadingSchedulerForTeacherStarts())
    SchedulerService.loadSchedulerForTeacher(getCookie("grade_book_token"))
        .then(response => {
            dispatch(actions.loadingSchedulerForTeacherSuccess(response.data));
        })
        .catch(error => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(commonActions.setCommonError(error.response.data ? error.response.data.errorCode : error.message))
            dispatch(actions.loadingSchedulerForTeacherError())
        })
};