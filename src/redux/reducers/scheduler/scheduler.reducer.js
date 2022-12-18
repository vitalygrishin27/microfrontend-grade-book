import actionTypes from "./scheduler.actionTypes"
import initialState from "./scheduler.initialStates"

const schedulerReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case actionTypes.SCHEDULER_WAS_CHANGED:
            const {columns, source, sourceColumn, sourceItems, destination, destColumn, destItems} = payload
            return {
                ...state,
                columns: {
                    ...columns,
                    [source.droppableId]: {
                        ...sourceColumn,
                        items: sourceItems
                    },
                    [destination.droppableId]: {
                        ...destColumn,
                        items: destItems
                    }
                }
            };
        case actionTypes.DATA_LOADING_STARTS:
            return {
                ...state,
                isDataLoading: true,
                error: null,
                columns: []
            };
        case actionTypes.DATA_LOADING_ERROR:
            return {
                ...state,
                isDataLoading: false,
                error: payload
            };
        case actionTypes.DATA_LOADING_SUCCESSFUL:
            if (payload.find(item => item.schedulerInternalId === 'free') === undefined) {
                payload.push({
                    schedulerInternalId: 'free',
                    name: "Free"
                })
            }
            return {
                ...state,
                isDataLoading: false,
                error: null,
                columns: {
                    ['subjects']: {
                        name: 'Subjects',
                        items: payload
                    },
                    ['Monday']: {
                        name: 'Monday',
                        items: []
                    },
                    ['Tuesday']: {
                        name: 'Tuesday',
                        items: []
                    },
                    ['Wednesday']: {
                        name: 'Wednesday',
                        items: []
                    },
                    ['Thursday']: {
                        name: 'Thursday',
                        items: []
                    },
                    ['Friday']: {
                        name: 'Friday',
                        items: []
                    },
                    ['Saturday']: {
                        name: 'Saturday',
                        items: []
                    }
                }
            };
        default:
            return state;
    }
};

export default schedulerReducer;