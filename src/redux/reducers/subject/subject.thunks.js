import actions from "./subject.actions"
import {getCookie} from "../../../helper/apiClient";
import SubjectService from "../../../service/subject.service";
import commonActions from "../common/common.actions";

export const loadSubjectListAsync = (needToSort: Boolean, search: string) => (dispatch) => {
    dispatch(actions.subjectListLoadingStart())
    SubjectService.loadSubjectList(getCookie("grade_book_token"), needToSort, search)
        .then(response => {
            dispatch(actions.subjectListLoadingSuccess(response.data));
        })
        .catch(error => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(actions.subjectListLoadingError(error.response.data ? error.response.data.errorCode : error.message))
        })
};
export const createSubjectAsync = (subject) => (dispatch) => {
    dispatch(actions.subjectCreationStart())
    SubjectService.createSubject(subject, getCookie("grade_book_token"))
        .then(response => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(actions.subjectCreationSuccess(response.data));
        })
        .catch(error => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(actions.subjectCreationError(error.response.data ? error.response.data.errorCode : error.message))
        })
};
export const updateSubjectAsync = (subject) => (dispatch) => {
    dispatch(actions.subjectEditingStart())
    SubjectService.updateSubject(subject, getCookie("grade_book_token"))
        .then(response => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(actions.subjectEditingSuccess(response.data));
        })
        .catch(error => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(actions.subjectEditingError(error.response.data ? error.response.data.errorCode : error.message))
        })
};
export const deleteSubjectAsync = (subject) => (dispatch) => {
    dispatch(actions.subjectDeletingStart())
    SubjectService.deleteSubject(subject.oid, getCookie("grade_book_token"))
        .then(response => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(actions.subjectDeletingSuccess(subject));
        })
        .catch(error => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(actions.subjectDeletingError(error.response.data ? error.response.data.errorCode : error.message))
        })
};
