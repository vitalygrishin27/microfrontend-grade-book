import actionTypes from './scheduler.actionTypes'

const dataLoadingStarts = () => ({
    type: actionTypes.DATA_LOADING_STARTS,
})
const dataLoadingSuccess = (data) => ({
    type: actionTypes.DATA_LOADING_SUCCESSFUL,
    payload:data
})
const dataLoadingError = (error) => ({
    type: actionTypes.DATA_LOADING_ERROR,
    payload:error
})
const schedulerWasChanged = (data) => ({
    type: actionTypes.SCHEDULER_WAS_CHANGED,
    payload: data
})

const actions = {
    dataLoadingStarts,
    dataLoadingSuccess,
    dataLoadingError,
    schedulerWasChanged
}

export default actions;