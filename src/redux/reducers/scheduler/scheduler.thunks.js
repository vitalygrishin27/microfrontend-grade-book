import actions from "./scheduler.actions"
import subjectActions from "../subject/subject.actions"
import clazzActions from "../clazz/clazz.actions"
import {getCookie} from "../../../helper/apiClient";
import SubjectService from "../../../service/subject.service";
import commonActions from "../common/common.actions";
import ClazzService from "../../../service/clazz.service";


export const dataLoadingStarts = (needToSort: Boolean, search: string) => (dispatch) => {
    let subjects = null;
    dispatch(actions.dataLoadingStarts())

    ClazzService.loadClazzList(getCookie("grade_book_token"), needToSort, search)
        .then(response => {
            dispatch(clazzActions.clazzListLoadingSuccess(response.data));
            SubjectService.loadSubjectList(getCookie("grade_book_token"), needToSort, search)
                .then(response => {
                    dispatch(subjectActions.subjectListLoadingSuccess(response.data));
                    subjects = response.data;
                    dispatch(actions.dataLoadingSuccess(subjects));
                })
                .catch(error => {
                    dispatch(commonActions.setToastShowing(true))
                    dispatch(subjectActions.subjectListLoadingError(error.response.data ? error.response.data.errorCode : error.message))
                    dispatch(actions.dataLoadingError(error.response.data ? error.response.data.errorCode : error.message))
                });
        })
        .catch(error => {
            dispatch(commonActions.setToastShowing(true))
            dispatch(clazzActions.clazzListLoadingError(error.response.data ? error.response.data.errorCode : error.message))
            dispatch(actions.dataLoadingError(error.response.data ? error.response.data.errorCode : error.message))
        })
};