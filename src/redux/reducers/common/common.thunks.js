import actions from "./common.actions"
import {getCookie} from "../../../helper/apiClient";
import CommonService from "../../../service/common.service";

export const setToastShowing = (flag) => (dispatch) => {
    dispatch(actions.setToastShowing(flag))
};

export const serviceVersionAsync = () => (dispatch) => {
    dispatch(actions.getVersionStart())
    CommonService.getServiceVersion(getCookie("grade_book_token"))
        .then(response => {
            dispatch(actions.getVersionSuccess(response.data));
        })
        .catch(error => {
            console.log("Exception while getting service version (" + error.response.data ? error.response.data.errorCode : error.message + ")");
        })
};