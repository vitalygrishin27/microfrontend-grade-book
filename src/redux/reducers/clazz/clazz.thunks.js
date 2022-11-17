import actions from "./clazz.actions"
import {getCookie} from "../../../helper/apiClient";
import ClazzService from "../../../service/clazz.service";
import commonActions from "../common/common.actions";

export const loadClazzListAsync = (needToSort: Boolean, search: string) => (dispatch) => {
    dispatch(actions.clazzListLoadingStart())
    ClazzService.loadClazzList(getCookie("grade_book_token"), needToSort, search)
        .then(response => {
            dispatch(actions.clazzListLoadingSuccess(response.data));
        })
        .catch(error => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(actions.clazzListLoadingError(error.response.data ? error.response.data.errorCode : error.message))
        })
};
export const createClazzAsync = (clazz) => (dispatch) => {
    dispatch(actions.clazzCreationStart())
    ClazzService.createClazz(clazz, getCookie("grade_book_token"))
        .then(response => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(actions.clazzCreationSuccess(response.data));
        })
        .catch(error => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(actions.clazzCreationError(error.response.data ? error.response.data.errorCode : error.message))
        })
};
export const updateClazzAsync = (clazz) => (dispatch) => {
    dispatch(actions.clazzEditingStart())
    ClazzService.updateClazz(clazz, getCookie("grade_book_token"))
        .then(response => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(actions.clazzEditingSuccess(response.data));
        })
        .catch(error => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(actions.clazzEditingError(error.response.data ? error.response.data.errorCode : error.message))
        })
};
export const deleteClazzAsync = (clazz) => (dispatch) => {
    dispatch(actions.clazzDeletingStart())
    ClazzService.deleteClazz(clazz.oid, getCookie("grade_book_token"))
        .then(response => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(actions.clazzDeletingSuccess(clazz));
        })
        .catch(error => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(actions.clazzDeletingError(error.response.data ? error.response.data.errorCode : error.message))
        })
};
