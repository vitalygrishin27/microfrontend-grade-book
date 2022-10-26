import actionTypes from "./login.actionTypes"
import initialState from "./login.initialStates"

const loginReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case actionTypes.LOGIN_IN_START:
            return {
                ...state,
                isLoading: true,
                error: null,
                username: null
            };
        case actionTypes.LOGIN_IN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                token: payload,
                error: null,
                isLoginIn: true,
            };
        case actionTypes.LOGIN_IN_ERROR:
            return {
                ...state,
                isLoading: false,
                error: payload,
            };
        case actionTypes.LOGIN_OUT:
            return {
                ...state,
                token: null,
                isLoginIn: false,
            };
        default:
            return state;
    }
};

export default loginReducer;