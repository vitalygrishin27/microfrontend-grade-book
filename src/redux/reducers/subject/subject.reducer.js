import actionTypes from "./subject.actionTypes"
import initialState from "./subject.initialStates"

const subjectReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case actionTypes.SUBJECT_LIST_LOADING_START:
            return {
                ...state,
                isSubjectListLoading: true,
                error: null,
                subjects: null
            };
        case actionTypes.SUBJECT_LIST_LOADING_SUCCESS:
            return {
                ...state,
                isSubjectListLoading: false,
                error: null,
                subjects: payload,
            };
        case actionTypes.SUBJECT_LIST_LOADING_ERROR:
            return {
                ...state,
                isSubjectListLoading: false,
                error: payload
            };
        case actionTypes.SUBJECT_CREATION_START:
            return {
                ...state,
                isSubjectCreating: true,
                error: null,
            };
        case actionTypes.SUBJECT_CREATION_SUCCESS:
            const updatedSubjectList = state.subjects;
            updatedSubjectList.splice(0, 0, payload);
            return {
                ...state,
                isSubjectCreating: false,
                error: null,
                subjects: updatedSubjectList,
            };
        case actionTypes.SUBJECT_CREATION_ERROR:
            return {
                ...state,
                isSubjectCreating: false,
                error: payload
            };
        case actionTypes.SUBJECT_EDITING_START:
            return {
                ...state,
                isSubjectEditing: true,
                error: null,
            };
        case actionTypes.SUBJECT_EDITING_SUCCESS:
            const updatedSubjectListAfterEditing = state.subjects.map(subject => subject.oid === payload.oid ? payload : subject);
            return {
                ...state,
                isSubjectEditing: false,
                error: null,
                subjects: updatedSubjectListAfterEditing,
            };
        case actionTypes.SUBJECT_EDITING_ERROR:
            return {
                ...state,
                isSubjectEditing: false,
                error: payload
            };
        case actionTypes.SUBJECT_DELETING_START:
            return {
                ...state,
                isSubjectDeleting: true,
                error: null,
            };
        case actionTypes.SUBJECT_DELETING_SUCCESS:
            const updatedSubjects = state.subjects.filter((subject) => subject.oid !== payload.oid);
            return {
                ...state,
                isSubjectDeleting: false,
                error: null,
                subjects: updatedSubjects,
            };
        case actionTypes.SUBJECT_DELETING_ERROR:
            return {
                ...state,
                isSubjectDeleting: false,
                error: payload
            };
        default:
            return state;
    }
};

export default subjectReducer;