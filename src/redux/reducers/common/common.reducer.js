import actionTypes from "./common.actionTypes"
import initialState from "./common.initialStates"

const commonReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case actionTypes.CHANGE_TOAST_SHOWING:
            return {
                ...state,
                isToastShowing: payload,
            };
        default:
            return state;
    }
};

export default commonReducer;