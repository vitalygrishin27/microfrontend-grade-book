import actionTypes from './fullScheduler.actionTypes'

const fullSchedulerLoadingStarts = () => ({
    type: actionTypes.FULL_SCHEDULER_LOADING_STARTS,
})
const fullSchedulerLoadingSuccess = (data) => ({
    type: actionTypes.FULL_SCHEDULER_LOADING_SUCCESSFUL,
    payload: data
})
const fullSchedulerLoadingError = () => ({
    type: actionTypes.FULL_SCHEDULER_LOADING_ERROR,
})
const fullSchedulerSavingStart = () => ({
    type: actionTypes.FULL_SCHEDULER_SAVING_START
})

const fullSchedulerSavingSuccess = () => ({
    type: actionTypes.FULL_SCHEDULER_SAVING_SUCCESS,
})

const fullSchedulerSavingError = () => ({
    type: actionTypes.FULL_SCHEDULER_SAVING_ERROR,
})

const actions = {
    fullSchedulerLoadingStarts,
    fullSchedulerLoadingSuccess,
    fullSchedulerLoadingError,
    fullSchedulerSavingStart,
    fullSchedulerSavingSuccess,
    fullSchedulerSavingError
}

export default actions;