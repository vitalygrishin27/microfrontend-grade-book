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
            dispatch(commonActions.setCommonError(error.response.data ? error.response.data.errorCode : error.message))
            dispatch(actions.clazzListLoadingError())
        })
};
export const createClazzAsync = (clazz) => (dispatch) => {
    dispatch(actions.clazzCreationStart())
    ClazzService.createClazz(clazz, getCookie("grade_book_token"))
        .then(response => {
            dispatch(commonActions.setToastShowing(true));
            dispatch(commonActions.setCommonMessage("Class was created"));
            dispatch(actions.clazzCreationSuccess(response.data));
        })
        .catch(error => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(commonActions.setCommonError(error.response.data ? error.response.data.errorCode : error.message))
            dispatch(actions.clazzCreationError())
        })
};
export const updateClazzAsync = (clazz) => (dispatch) => {
    dispatch(actions.clazzEditingStart())
    ClazzService.updateClazz(clazz, getCookie("grade_book_token"))
        .then(response => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(commonActions.setCommonMessage("Class was updated"));
            dispatch(actions.clazzEditingSuccess(response.data));
        })
        .catch(error => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(commonActions.setCommonError(error.response.data ? error.response.data.errorCode : error.message))
            dispatch(actions.clazzEditingError())
        })
};
export const deleteClazzAsync = (clazz) => (dispatch) => {
    dispatch(actions.clazzDeletingStart())
    ClazzService.deleteClazz(clazz.oid, getCookie("grade_book_token"))
        .then(response => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(commonActions.setCommonMessage("Class was deleted"));
            dispatch(actions.clazzDeletingSuccess(clazz));
        })
        .catch(error => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(commonActions.setCommonError(error.response.data ? error.response.data.errorCode : error.message))
            dispatch(actions.clazzDeletingError())
        })
};
