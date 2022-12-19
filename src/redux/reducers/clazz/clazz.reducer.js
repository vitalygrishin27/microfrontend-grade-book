import actionTypes from "./clazz.actionTypes"
import initialState from "./clazz.initialStates"

const clazzReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case actionTypes.CLAZZ_LIST_LOADING_START:
            return {
                ...state,
                isClazzListLoading: true,
                classes: null
            };
        case actionTypes.CLAZZ_LIST_LOADING_SUCCESS:
            return {
                ...state,
                isClazzListLoading: false,
                classes: payload,
            };
        case actionTypes.CLAZZ_LIST_LOADING_ERROR:
            return {
                ...state,
                isClazzListLoading: false,
            };
        case actionTypes.CLAZZ_CREATION_START:
            return {
                ...state,
                isClazzCreating: true,
            };
        case actionTypes.CLAZZ_CREATION_SUCCESS:
            const updatedClazzList = state.classes;
            updatedClazzList.splice(0, 0, payload);
            return {
                ...state,
                isClazzCreating: false,
                classes: updatedClazzList,
            };
        case actionTypes.CLAZZ_CREATION_ERROR:
            return {
                ...state,
                isClazzCreating: false,
            };
        case actionTypes.CLAZZ_EDITING_START:
            return {
                ...state,
                isClazzEditing: true,
            };
        case actionTypes.CLAZZ_EDITING_SUCCESS:
            const updatedClazzListAfterEditing = state.classes.map(clazz => clazz.oid === payload.oid ? payload : clazz);
            return {
                ...state,
                isClazzEditing: false,
                classes: updatedClazzListAfterEditing,
            };
        case actionTypes.CLAZZ_EDITING_ERROR:
            return {
                ...state,
                isClazzEditing: false,
            };
        case actionTypes.CLAZZ_DELETING_START:
            return {
                ...state,
                isClazzDeleting: true,
            };
        case actionTypes.CLAZZ_DELETING_SUCCESS:
            const updatedClasses = state.classes.filter((clazz) => clazz.oid !== payload.oid);
            return {
                ...state,
                isClazzDeleting: false,
                classes: updatedClasses,
            };
        case actionTypes.CLAZZ_DELETING_ERROR:
            return {
                ...state,
                isClazzDeleting: false,
            };
        default:
            return state;
    }
};

export default clazzReducer;