import actions from "./scheduler.actions"
import {getCookie} from "../../../helper/apiClient";
import commonActions from "../common/common.actions";
import SchedulerService from "../../../service/scheduler.service";

export const dataLoadingStarts = (clazzOid: number) => (dispatch) => {
    dispatch(actions.dataLoadingStarts())

    SchedulerService.loadScheduler(clazzOid, getCookie("grade_book_token"))
        .then(response => {
            console.log(response.data)
            dispatch(actions.dataLoadingSuccess(response.data));
        })
        .catch(error => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(actions.dataLoadingError(error.response.data ? error.response.data.errorCode : error.message))
        })
};
export const createSchedulerAsync = (scheduler) => (dispatch) => {
    dispatch(actions.schedulerCreationStart())
    SchedulerService.createScheduler(scheduler, getCookie("grade_book_token"))
        .then(response => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(actions.schedulerCreationSuccess(response.data));
        })
        .catch(error => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(actions.schedulerCreationError(error.response.data ? error.response.data.errorCode : error.message))
        })
};