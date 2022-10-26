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
        default:
            return state;
    }
};

export default subjectReducer;