import actions from "./subject.actions"
import {getCookie} from "../../../helper/apiClient";
import SubjectService from "../../../service/subject.service";
import commonActions from "../common/common.actions";

export const loadSubjectListAsync = () => (dispatch) => {
    dispatch(commonActions.setToastShowing(true))
    dispatch(actions.subjectListLoadingStart())
    SubjectService.loadSubjectList(getCookie("grade_book_token"))
        .then(response => {
            dispatch(actions.subjectListLoadingSuccess(response.data));
            console.log(response.data)
        })
        .catch(error => {
            console.log(error.response.data);
            dispatch(actions.subjectListLoadingError(error.response.data ? error.response.data.errorCode : error.message))
        })
};