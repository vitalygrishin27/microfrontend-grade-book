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

const schedulerCreationSuccess = () => ({
    type: actionTypes.SCHEDULER_CREATION_SUCCESS,
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
const clearBoard = (columns) => ({
    type: actionTypes.CLEAR_BOARD,
    payload: columns
})

const loadingSchedulerForTeacherStarts = () => ({
    type: actionTypes.LOADING_SCHEDULER_FOR_TEACHER_STARTS,
})
const loadingSchedulerForTeacherSuccess = (data) => ({
    type: actionTypes.LOADING_SCHEDULER_FOR_TEACHER_SUCCESS,
    payload: data
})
const loadingSchedulerForTeacherError = () => ({
    type: actionTypes.LOADING_SCHEDULER_FOR_TEACHER_ERROR,
})

const actions = {
    dataLoadingStarts,
    dataLoadingSuccess,
    dataLoadingError,
    schedulerCreationStart,
    schedulerCreationSuccess,
    schedulerCreationError,
    schedulerWasChangedBetweenColumns,
    schedulerWasChangedInsideColumn,
    clearBoard,
    loadingSchedulerForTeacherStarts,
    loadingSchedulerForTeacherSuccess,
    loadingSchedulerForTeacherError
}

export default actions;