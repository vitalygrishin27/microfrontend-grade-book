import actions from "./login.actions"
import LoginService from "../../../service/login.service";
import {getCookie} from "../../../helper/apiClient";

export const loginInAsync = (user) => (dispatch) => {
    dispatch(actions.loginInStart())
    LoginService.loginIn(user, getCookie("grade_book_token"))
        .then(response => {
            dispatch(actions.loginInSuccess(response.data));
            console.log(response)
            document.cookie = "grade_book_token=" + encodeURIComponent(response.data.token) + "; expires=" + response.data.validTo + "; path=/"
        })
        .catch(error => {
            console.log(error.response.data);
            dispatch(actions.loginInError(error.response.data ? error.response.data.errorMessage : error.message))
        })
};

export const loginOut = () => (dispatch) => {
    dispatch(actions.loginOut())
};

export const setToastShowing = (flag) => (dispatch) => {
    dispatch(actions.setToastShowing(flag))
};