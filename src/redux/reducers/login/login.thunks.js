import actions from "./login.actions"
import LoginService from "../../../service/login.service";
import {getCookie} from "../../../helper/apiClient";
import commonActions from "../common/common.actions";
import {rootUrl} from "../../../App";

export const loginInAsync = (user) => (dispatch) => {
    dispatch(commonActions.setToastShowing(true))
    dispatch(actions.loginInStart())
    LoginService.loginIn(user, getCookie("grade_book_token"))
        .then(response => {
            dispatch(actions.loginInSuccess(response.data));
            document.cookie = "grade_book_token=" + encodeURIComponent(response.data.token) + "; expires=" + response.data.validTo + "; path=" + rootUrl
        })
        .catch(error => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(actions.loginInError(error.response.data ? error.response.data.errorCode : error.message))
        })
};

export const loginInAsyncByToken = () => (dispatch) => {
    dispatch(actions.loginInStart())
    LoginService.loginInByToken(getCookie("grade_book_token"))
        .then(response => {
            dispatch(actions.loginInSuccess(response.data));
            document.cookie = "grade_book_token=" + encodeURIComponent(response.data.token) + "; expires=" + response.data.validTo + "; path=" + rootUrl
        })
        .catch(error => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(commonActions.setError(error.response.data ? error.response.data.errorCode : error.message))
            dispatch(actions.loginOut())
            dispatch(actions.loginInError(error.response.data ? error.response.data.errorCode : error.message))
        })
};

export const loginOut = () => (dispatch) => {
    dispatch(actions.loginOut())
};
