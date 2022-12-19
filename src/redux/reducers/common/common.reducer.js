import actionTypes from "./common.actionTypes"
import initialState from "./common.initialStates"

const commonReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case actionTypes.CHANGE_TOAST_SHOWING:
            return {
                ...state,
                isToastShowing: payload,
                commonError: payload ? state.commonError : null,
                commonMessage: payload ? state.commonMessage : null
            };
        case actionTypes.SET_COMMON_ERROR:
            return {
                ...state,
                commonError: payload,
            };
        case actionTypes.SET_COMMON_MESSAGE:
            return {
                ...state,
                commonMessage: payload,
            };
        case actionTypes.GET_VERSION_START:
            return {
                ...state,
                serviceVersion: "loading",
            };
        case actionTypes.GET_VERSION_SUCCESS:
            return {
                ...state,
                serviceVersion: payload,
            };
        case actionTypes.GET_VERSION_ERROR:
            return {
                ...state,
                serviceVersion: "unknown",
            };
        default:
            return state;
    }
};

export default commonReducer;