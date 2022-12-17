import actionTypes from "./scheduler.actionTypes"
import initialState from "./scheduler.initialStates"
import {uid} from "uid";

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
        case actionTypes.SUBJECT_LIST_IS_LOADED:
            if (payload.find(item => item.schedulerInternalId === 'free') === undefined) {
                payload.push({
                    schedulerInternalId: 'free',
                    name: "Free"
                })
            }
            return {
                ...state,
                columns: {
                    ['first']: {
                        name: 'Subjects',
                        items: payload
                    },
                    [uid()]: {
                        name: 'Monday',
                        items: []
                    },
                    [uid()]: {
                        name: 'Tuesday',
                        items: []
                    },
                    [uid()]: {
                        name: 'Wednesday',
                        items: []
                    },
                    [uid()]: {
                        name: 'Thursday',
                        items: []
                    },
                    [uid()]: {
                        name: 'Friday',
                        items: []
                    },
                    [uid()]: {
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