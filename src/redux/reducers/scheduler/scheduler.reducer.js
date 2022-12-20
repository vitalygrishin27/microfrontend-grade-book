import actionTypes from "./scheduler.actionTypes"
import initialState from "./scheduler.initialStates"

const schedulerReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case actionTypes.SCHEDULER_WAS_CHANGED_BETWEEN_COLUMNS:
            const {columns, source, sourceColumn, sourceItems, destination, destColumn, destItems} = payload
            return {
                ...state,
                unsavedChangesPresent: true,
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
        case actionTypes.SCHEDULER_WAS_CHANGED_INSIDE_COLUMN:
            const {columns:columnsI, source:sourceI, destination:destinationI} = payload
            const column = columnsI[sourceI.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(sourceI.index, 1);
            copiedItems.splice(destinationI.index, 0, removed);


            return {
                ...state,
                unsavedChangesPresent: true,
                columns: {
                    ...columnsI,
                    [sourceI.droppableId]: {
                        ...column,
                        items: copiedItems
                    }
                }
            };
        case actionTypes.DATA_LOADING_STARTS:
            return {
                ...state,
                unsavedChangesPresent: false,
                isDataLoading: true,
                columns: []
            };
        case actionTypes.DATA_LOADING_ERROR:
            return {
                ...state,
                isDataLoading: false,
            };
        case actionTypes.CLEAR_BOARD:
            return {
                ...state,
                unsavedChangesPresent: true,
                columns: {
                    ...payload,
                    ["MONDAY"]: {
                        name:"MONDAY",
                        items: []
                    },
                    ["TUESDAY"]: {
                        name:"TUESDAY",
                        items: []
                    },
                    ["WEDNESDAY"]: {
                        name:"WEDNESDAY",
                        items: []
                    },
                    ["THURSDAY"]: {
                        name:"THURSDAY",
                        items: []
                    },
                    ["FRIDAY"]: {
                        name:"FRIDAY",
                        items: []
                    },
                    ["SATURDAY"]: {
                        name:"SATURDAY",
                        items: []
                    },
                }
            };
        case actionTypes.DATA_LOADING_SUCCESSFUL:
            if (payload.daySchedulerBomList[0].items.find(item => item.schedulerInternalId === 'Free') === undefined) {
                payload.daySchedulerBomList[0].items.push({
                    schedulerInternalId: 'Free',
                    name: "Free"
                })
            }
            return {
                ...state,
                isDataLoading: false,
                unsavedChangesPresent: false,
                error: null,
                columns: {
                    [payload.daySchedulerBomList[0].name]: {
                        name: payload.daySchedulerBomList[0].name,
                        items: payload.daySchedulerBomList[0].items,
                    },
                    [payload.daySchedulerBomList[1].name]: {
                        name: payload.daySchedulerBomList[1].name,
                        items: payload.daySchedulerBomList[1].items
                    },
                    [payload.daySchedulerBomList[2].name]: {
                        name: payload.daySchedulerBomList[2].name,
                        items: payload.daySchedulerBomList[2].items
                    },
                    [payload.daySchedulerBomList[3].name]: {
                        name: payload.daySchedulerBomList[3].name,
                        items: payload.daySchedulerBomList[3].items
                    },
                    [payload.daySchedulerBomList[4].name]: {
                        name: payload.daySchedulerBomList[4].name,
                        items: payload.daySchedulerBomList[4].items
                    },
                    [payload.daySchedulerBomList[5].name]: {
                        name: payload.daySchedulerBomList[5].name,
                        items: payload.daySchedulerBomList[5].items
                    },
                    [payload.daySchedulerBomList[6].name]: {
                        name: payload.daySchedulerBomList[6].name,
                        items: payload.daySchedulerBomList[6].items
                    }
                }
            };
        case actionTypes.SCHEDULER_CREATION_START:
            return {
                ...state,
                isSchedulerCreating: true,
            };
        case actionTypes.SCHEDULER_CREATION_SUCCESS:
            return {
                ...state,
                unsavedChangesPresent: false,
                isSchedulerCreating: false,
                scheduler: payload,
            };
        case actionTypes.SCHEDULER_CREATION_ERROR:
            return {
                ...state,
                isSchedulerCreating: false,
            };
        default:
            return state;
    }
};

export default schedulerReducer;