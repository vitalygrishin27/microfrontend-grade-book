import actionTypes from "./fullScheduler.actionTypes"
import initialState from "./fullScheduler.initialStates"

const fullSchedulerReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case actionTypes.FULL_SCHEDULER_LOADING_STARTS:
            return {
                ...state,
                unsavedChangesPresent: false,
                isFullSchedulerLoading: true,
                fullScheduler: []
            };
        case actionTypes.FULL_SCHEDULER_LOADING_ERROR:
            return {
                ...state,
                isFullSchedulerLoading: false,
            };
        case actionTypes.FULL_SCHEDULER_LOADING_SUCCESSFUL:
            return {
                ...state,
                isFullSchedulerLoading: false,
                unsavedChangesPresent: false,
                fullScheduler: payload
            };
        case actionTypes.FULL_SCHEDULER_SAVING_START:
            return {
                ...state,
                isFullSchedulerSaving: true,
            };
        case actionTypes.FULL_SCHEDULER_SAVING_SUCCESS:
            return {
                ...state,
                unsavedChangesPresent: false,
                isFullSchedulerSaving: false,
                fullScheduler: payload
            };
        case actionTypes.FULL_SCHEDULER_SAVING_ERROR:
            return {
                ...state,
                isFullSchedulerSaving: false,
            };
        default:
            return state;
    }
};

export default fullSchedulerReducer;