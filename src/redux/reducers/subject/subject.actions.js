import actionTypes from './subject.actionTypes'

const subjectListLoadingStart = () => ({
    type: actionTypes.SUBJECT_LIST_LOADING_START
})

const subjectListLoadingSuccess = (subjectList) => ({
    type: actionTypes.SUBJECT_LIST_LOADING_SUCCESS,
    payload: subjectList
})

const subjectListLoadingError = (error) => ({
    type: actionTypes.SUBJECT_LIST_LOADING_ERROR,
    payload: error

})

const actions = {
    subjectListLoadingStart,
    subjectListLoadingSuccess,
    subjectListLoadingError,
}

export default actions;