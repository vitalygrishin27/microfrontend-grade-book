import actions from "./user.actions"
import {getCookie} from "../../../helper/apiClient";
import UserService from "../../../service/user.service";
import commonActions from "../common/common.actions";
import {AccessLevelFilter} from "../../../types/types";

export const loadUserListAsync = (accessLevelFilter: AccessLevelFilter, needToSort: Boolean, search: string) => (dispatch) => {
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

    functionToExecute(getCookie("grade_book_token"), needToSort, search)
        .then(response => {
            console.log(response.data)
            dispatch(actions.userListLoadingSuccess(response.data));
        })
        .catch(error => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(commonActions.setCommonError(error.response.data ? error.response.data.errorCode : error.message))
            dispatch(actions.userListLoadingError())
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
            dispatch(commonActions.setCommonError(error.response.data ? error.response.data.errorCode : error.message))
            dispatch(actions.userAccessLevelsLoadingError())
        })
};

export const createUserAsync = (user) => (dispatch) => {
    dispatch(actions.userCreationStart())
    UserService.createUser(user, getCookie("grade_book_token"))
        .then(response => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(commonActions.setCommonMessage("User was created"));
            dispatch(actions.userCreationSuccess(response.data));
        })
        .catch(error => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(commonActions.setCommonError(error.response.data ? error.response.data.errorCode : error.message))
            dispatch(actions.userCreationError())
        })
};
export const updateUserAsync = (user) => (dispatch) => {
    dispatch(actions.userEditingStart())
    UserService.updateUser(user, getCookie("grade_book_token"))
        .then(response => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(commonActions.setCommonMessage("User was updated"));
            dispatch(actions.userEditingSuccess(response.data));
        })
        .catch(error => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(commonActions.setCommonError(error.response.data ? error.response.data.errorCode : error.message))
            dispatch(actions.userEditingError())
        })
};
export const deleteUserAsync = (user) => (dispatch) => {
    dispatch(actions.userDeletingStart())
    UserService.deleteUser(user.oid, getCookie("grade_book_token"))
        .then(response => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(commonActions.setCommonMessage("User was deleted"));
            dispatch(actions.userDeletingSuccess(user));
        })
        .catch(error => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(commonActions.setCommonError(error.response.data ? error.response.data.errorCode : error.message))
            dispatch(actions.userDeletingError())
        })
};
