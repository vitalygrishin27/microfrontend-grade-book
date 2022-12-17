import actionTypes from './scheduler.actionTypes'

const subjectListIsLoaded = (subjectList) => ({
    type: actionTypes.SUBJECT_LIST_IS_LOADED,
    payload: subjectList
})
const schedulerWasChanged = (data) => ({
    type: actionTypes.SCHEDULER_WAS_CHANGED,
    payload: data
})

const actions = {
    subjectListIsLoaded,
    schedulerWasChanged
}

export default actions;