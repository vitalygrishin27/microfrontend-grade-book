import actions from "./fullScheduler.actions"
import {getCookie} from "../../../helper/apiClient";
import commonActions from "../common/common.actions";
import SchedulerService from "../../../service/scheduler.service";

export const loadFullScheduler = () => (dispatch) => {
    dispatch(actions.fullSchedulerLoadingStarts())
    SchedulerService.loadFullScheduler(getCookie("grade_book_token"))
        .then(response => {
            dispatch(actions.fullSchedulerLoadingSuccess(response.data));
        })
        .catch(error => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(commonActions.setCommonError(error.response.data ? error.response.data.errorCode : error.message))
            dispatch(actions.fullSchedulerLoadingError())
        })
};
export const saveFullSchedulerAsync = (scheduler) => (dispatch) => {
    dispatch(actions.fullSchedulerSavingStart())
    SchedulerService.saveFullScheduler(scheduler, getCookie("grade_book_token"))
        .then(response => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(commonActions.setCommonMessage("Full Scheduler was saved"))
            dispatch(actions.fullSchedulerSavingSuccess(response.data));
        })
        .catch(error => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(commonActions.setCommonError(error.response.data ? error.response.data.errorCode : error.message))
            dispatch(actions.fullSchedulerSavingError())
        })
};