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
            dispatch(commonActions.setCommonMessage("Login in is successful!"));
            document.cookie = "grade_book_token=" + encodeURIComponent(response.data.token) + "; expires=" + response.data.validTo + "; path=" + rootUrl
        })
        .catch(error => {
            dispatch(commonActions.setCommonError(error.response.data ? error.response.data.errorCode : error.message))
            dispatch(actions.loginInError())
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
            dispatch(commonActions.setCommonError(error.response.data ? error.response.data.errorCode : error.message))
            dispatch(actions.loginInError())
            dispatch(actions.loginOut())
        })
};

export const loginOut = () => (dispatch) => {
    dispatch(actions.loginOut())
};
