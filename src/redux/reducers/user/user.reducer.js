import initialState from "./user.initialStates"
import actionTypes from "../user/user.actionTypes";

const userReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case actionTypes.USER_LIST_LOADING_START:
            return {
                ...state,
                isUserListLoading: true,
                users: null
            };
        case actionTypes.USER_LIST_LOADING_SUCCESS:
            return {
                ...state,
                isUserListLoading: false,
                users: payload,
            };
        case actionTypes.USER_LIST_LOADING_ERROR:
            return {
                ...state,
                isUserListLoading: false,
            };
        case actionTypes.USER_ACCESS_LEVELS_LOADING_START:
            return {
                ...state,
                isAccessLevelsLoading: true,
                accessLevels: null
            };
        case actionTypes.USER_ACCESS_LEVELS_LOADING_SUCCESS:
            return {
                ...state,
                isAccessLevelsLoading: false,
                accessLevels: payload,
            };
        case actionTypes.USER_ACCESS_LEVELS_LOADING_ERROR:
            return {
                ...state,
                isAccessLevelsLoading: false,
            };
        case actionTypes.USER_CREATION_START:
            return {
                ...state,
                isUserCreating: true,
            };
        case actionTypes.USER_CREATION_SUCCESS:
            const updatedUserList = state.users;
            updatedUserList.splice(0, 0, payload);
            return {
                ...state,
                isUserCreating: false,
                users: updatedUserList,
            };
        case actionTypes.USER_CREATION_ERROR:
            return {
                ...state,
                isUserCreating: false,
            };
        case actionTypes.USER_EDITING_START:
            return {
                ...state,
                isUserEditing: true,
            };
        case actionTypes.USER_EDITING_SUCCESS:
            const updatedUserListAfterEditing = state.users.map(user => user.oid === payload.oid ? payload : user);
            return {
                ...state,
                isUserEditing: false,
                users: updatedUserListAfterEditing,
            };
        case actionTypes.USER_EDITING_ERROR:
            return {
                ...state,
                isUserEditing: false,
            };
        case actionTypes.USER_DELETING_START:
            return {
                ...state,
                isUserDeleting: true,
            };
        case actionTypes.USER_DELETING_SUCCESS:
            const updatedUsers = state.users.filter((user) => user.oid !== payload.oid);
            return {
                ...state,
                isUserDeleting: false,
                users: updatedUsers,
            };
        case actionTypes.USER_DELETING_ERROR:
            return {
                ...state,
                isUserDeleting: false,
            };
        default:
            return state;
    }
};

export default userReducer;