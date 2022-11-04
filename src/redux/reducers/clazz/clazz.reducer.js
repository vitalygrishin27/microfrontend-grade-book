import actionTypes from "./clazz.actionTypes"
import initialState from "./clazz.initialStates"

const clazzReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case actionTypes.CLAZZ_LIST_LOADING_START:
            return {
                ...state,
                isClazzListLoading: true,
                error: null,
                classes: null
            };
        case actionTypes.CLAZZ_LIST_LOADING_SUCCESS:
            return {
                ...state,
                isClazzListLoading: false,
                error: null,
                classes: payload,
            };
        case actionTypes.CLAZZ_LIST_LOADING_ERROR:
            return {
                ...state,
                isClazzListLoading: false,
                error: payload
            };
        case actionTypes.CLAZZ_CREATION_START:
            return {
                ...state,
                isClazzCreating: true,
                error: null,
            };
        case actionTypes.CLAZZ_CREATION_SUCCESS:
            const updatedClazzList = state.classes;
            updatedClazzList.splice(0, 0, payload);
            return {
                ...state,
                isClazzCreating: false,
                error: null,
                classes: updatedClazzList,
            };
        case actionTypes.CLAZZ_CREATION_ERROR:
            return {
                ...state,
                isClazzCreating: false,
                error: payload
            };
        case actionTypes.CLAZZ_EDITING_START:
            return {
                ...state,
                isClazzEditing: true,
                error: null,
            };
        case actionTypes.CLAZZ_EDITING_SUCCESS:
            const updatedClazzListAfterEditing = state.classes.map(clazz => clazz.oid === payload.oid ? payload : clazz);
            return {
                ...state,
                isClazzEditing: false,
                error: null,
                classes: updatedClazzListAfterEditing,
            };
        case actionTypes.CLAZZ_EDITING_ERROR:
            return {
                ...state,
                isClazzEditing: false,
                error: payload
            };
        case actionTypes.CLAZZ_DELETING_START:
            return {
                ...state,
                isClazzDeleting: true,
                error: null,
            };
        case actionTypes.CLAZZ_DELETING_SUCCESS:
            const updatedClasses = state.classes.filter((clazz) => clazz.oid !== payload.oid);
            return {
                ...state,
                isClazzDeleting: false,
                error: null,
                classes: updatedClasses,
            };
        case actionTypes.CLAZZ_DELETING_ERROR:
            return {
                ...state,
                isClazzDeleting: false,
                error: payload
            };
        default:
            return state;
    }
};

export default clazzReducer;