import initialState from "./user.initialStates"
import actionTypes from "../user/user.actionTypes";

const userReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case actionTypes.USER_LIST_LOADING_START:
            return {
                ...state,
                isUserListLoading: true,
                error: null,
                users: null
            };
        case actionTypes.USER_LIST_LOADING_SUCCESS:
            return {
                ...state,
                isUserListLoading: false,
                error: null,
                users: payload,
            };
        case actionTypes.USER_LIST_LOADING_ERROR:
            return {
                ...state,
                isUserListLoading: false,
                error: payload
            };
        case actionTypes.USER_ACCESS_LEVELS_LOADING_START:
            return {
                ...state,
                isAccessLevelsLoading: true,
                error: null,
                accessLevels: null
            };
        case actionTypes.USER_ACCESS_LEVELS_LOADING_SUCCESS:
            return {
                ...state,
                isAccessLevelsLoading: false,
                error: null,
                accessLevels: payload,
            };
        case actionTypes.USER_ACCESS_LEVELS_LOADING_ERROR:
            return {
                ...state,
                isAccessLevelsLoading: false,
                error: payload
            };
        case actionTypes.USER_CREATION_START:
            return {
                ...state,
                isUserCreating: true,
                error: null,
            };
        case actionTypes.USER_CREATION_SUCCESS:
            const updatedUserList = state.users;
            updatedUserList.splice(0, 0, payload);
            return {
                ...state,
                isUserCreating: false,
                error: null,
                users: updatedUserList,
            };
        case actionTypes.USER_CREATION_ERROR:
            return {
                ...state,
                isUserCreating: false,
                error: payload
            };
        case actionTypes.USER_EDITING_START:
            return {
                ...state,
                isUserEditing: true,
                error: null,
            };
        case actionTypes.USER_EDITING_SUCCESS:
            const updatedUserListAfterEditing = state.users.map(user => user.oid === payload.oid ? payload : user);
            return {
                ...state,
                isUserEditing: false,
                error: null,
                users: updatedUserListAfterEditing,
            };
        case actionTypes.USER_EDITING_ERROR:
            return {
                ...state,
                isUserEditing: false,
                error: payload
            };
        case actionTypes.USER_DELETING_START:
            return {
                ...state,
                isUserDeleting: true,
                error: null,
            };
        case actionTypes.USER_DELETING_SUCCESS:
            const updatedUsers = state.users.filter((user) => user.oid !== payload.oid);
            return {
                ...state,
                isUserDeleting: false,
                error: null,
                users: updatedUsers,
            };
        case actionTypes.USER_DELETING_ERROR:
            return {
                ...state,
                isUserDeleting: false,
                error: payload
            };
        default:
            return state;
    }
};

export default userReducer;