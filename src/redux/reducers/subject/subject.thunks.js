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
            dispatch(commonActions.setCommonError(error.response.data ? error.response.data.errorCode : error.message))
            dispatch(actions.subjectListLoadingError())
        })
};
export const createSubjectAsync = (subject) => (dispatch) => {
    dispatch(actions.subjectCreationStart())
    SubjectService.createSubject(subject, getCookie("grade_book_token"))
        .then(response => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(commonActions.setCommonMessage("Subject was created"));
            dispatch(actions.subjectCreationSuccess(response.data));
        })
        .catch(error => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(commonActions.setCommonError(error.response.data ? error.response.data.errorCode : error.message))
            dispatch(actions.subjectCreationError())
        })
};
export const updateSubjectAsync = (subject) => (dispatch) => {
    dispatch(actions.subjectEditingStart())
    SubjectService.updateSubject(subject, getCookie("grade_book_token"))
        .then(response => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(commonActions.setCommonMessage("Subject was updated"));
            dispatch(actions.subjectEditingSuccess(response.data));
        })
        .catch(error => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(commonActions.setCommonError(error.response.data ? error.response.data.errorCode : error.message))
            dispatch(actions.subjectEditingError())
        })
};
export const deleteSubjectAsync = (subject) => (dispatch) => {
    dispatch(actions.subjectDeletingStart())
    SubjectService.deleteSubject(subject.oid, getCookie("grade_book_token"))
        .then(response => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(commonActions.setCommonMessage("Subject was deleted"));
            dispatch(actions.subjectDeletingSuccess(subject));
        })
        .catch(error => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(commonActions.setCommonError(error.response.data ? error.response.data.errorCode : error.message))
            dispatch(actions.subjectDeletingError())
        })
};
