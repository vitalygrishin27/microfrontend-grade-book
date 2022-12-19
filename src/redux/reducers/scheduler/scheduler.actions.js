import actionTypes from './scheduler.actionTypes'

const dataLoadingStarts = () => ({
    type: actionTypes.DATA_LOADING_STARTS,
})
const dataLoadingSuccess = (data) => ({
    type: actionTypes.DATA_LOADING_SUCCESSFUL,
    payload: data
})
const dataLoadingError = () => ({
    type: actionTypes.DATA_LOADING_ERROR,
})
const schedulerCreationStart = () => ({
    type: actionTypes.SCHEDULER_CREATION_START
})

const schedulerCreationSuccess = (scheduler) => ({
    type: actionTypes.SCHEDULER_CREATION_SUCCESS,
    payload: scheduler
})

const schedulerCreationError = () => ({
    type: actionTypes.SCHEDULER_CREATION_ERROR,
})
const schedulerWasChangedBetweenColumns = (data) => ({
    type: actionTypes.SCHEDULER_WAS_CHANGED_BETWEEN_COLUMNS,
    payload: data
})
const schedulerWasChangedInsideColumn = (data) => ({
    type: actionTypes.SCHEDULER_WAS_CHANGED_INSIDE_COLUMN,
    payload: data
})

const actions = {
    dataLoadingStarts,
    dataLoadingSuccess,
    dataLoadingError,
    schedulerCreationStart,
    schedulerCreationSuccess,
    schedulerCreationError,
    schedulerWasChangedBetweenColumns,
    schedulerWasChangedInsideColumn
}

export default actions;