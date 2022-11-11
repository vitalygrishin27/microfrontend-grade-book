import actions from "./user.actions"
import {getCookie} from "../../../helper/apiClient";
import UserService from "../../../service/user.service";
import commonActions from "../common/common.actions";
import {AccessLevelFilter} from "../../../types/types";

export const loadUserListAsync = (accessLevelFilter: AccessLevelFilter) => (dispatch) => {
    dispatch(actions.userListLoadingStart())
    let functionToExecute;
    switch (accessLevelFilter) {
        case AccessLevelFilter.ALL:
            functionToExecute = UserService.loadUserList;
            break;
        case AccessLevelFilter.PUPIL:
            functionToExecute = UserService.loadPupilList;
            break;
        case AccessLevelFilter.TEACHER:
            functionToExecute = UserService.loadTeacherList;
            break;
        case AccessLevelFilter.ADMIN:
            functionToExecute = UserService.loadAdminList;
            break;
        default:
            functionToExecute = UserService.loadUserList;
    }

    functionToExecute(getCookie("grade_book_token"))
        .then(response => {
            dispatch(actions.userListLoadingSuccess(response.data));
            console.log(response.data)
        })
        .catch(error => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(actions.userListLoadingError(error.response.data ? error.response.data.errorCode : error.message))
        })
};

export const loadAccessLevelsAsync = () => (dispatch) => {
    dispatch(actions.userAccessLevelsLoadingStart())
    UserService.loadAccessLevels(getCookie("grade_book_token"))
        .then(response => {
            dispatch(actions.userAccessLevelsLoadingSuccess(response.data));
        })
        .catch(error => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(actions.userAccessLevelsLoadingError(error.response.data ? error.response.data.errorCode : error.message))
        })
};

export const createUserAsync = (user) => (dispatch) => {
    dispatch(actions.userCreationStart())
    UserService.createUser(user, getCookie("grade_book_token"))
        .then(response => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(actions.userCreationSuccess(response.data));
        })
        .catch(error => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(actions.userCreationError(error.response.data ? error.response.data.errorCode : error.message))
        })
};
export const updateUserAsync = (user) => (dispatch) => {
    dispatch(actions.userEditingStart())
    UserService.updateUser(user, getCookie("grade_book_token"))
        .then(response => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(actions.userEditingSuccess(response.data));
        })
        .catch(error => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(actions.userEditingError(error.response.data ? error.response.data.errorCode : error.message))
        })
};
export const deleteUserAsync = (user) => (dispatch) => {
    dispatch(actions.userDeletingStart())
    UserService.deleteUser(user.oid, getCookie("grade_book_token"))
        .then(response => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(actions.userDeletingSuccess(user));
        })
        .catch(error => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(actions.userDeletingError(error.response.data ? error.response.data.errorCode : error.message))
        })
};
