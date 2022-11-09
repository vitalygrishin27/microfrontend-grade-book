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

const subjectCreationStart = () => ({
    type: actionTypes.SUBJECT_CREATION_START
})

const subjectCreationSuccess = (newSubject) => ({
    type: actionTypes.SUBJECT_CREATION_SUCCESS,
    payload: newSubject
})

const subjectCreationError = (error) => ({
    type: actionTypes.SUBJECT_CREATION_ERROR,
    payload: error

})

const subjectEditingStart = () => ({
    type: actionTypes.SUBJECT_EDITING_START
})

const subjectEditingSuccess = (updatedSubject) => ({
    type: actionTypes.SUBJECT_EDITING_SUCCESS,
    payload: updatedSubject
})

const subjectEditingError = (error) => ({
    type: actionTypes.SUBJECT_EDITING_ERROR,
    payload: error

})

const subjectDeletingStart = () => ({
    type: actionTypes.SUBJECT_DELETING_START
})

const subjectDeletingSuccess = (subject) => ({
    type: actionTypes.SUBJECT_DELETING_SUCCESS,
    payload: subject
})

const subjectDeletingError = (error) => ({
    type: actionTypes.SUBJECT_DELETING_ERROR,
    payload: error

})

const actions = {
    subjectListLoadingStart,
    subjectListLoadingSuccess,
    subjectListLoadingError,
    subjectCreationStart,
    subjectCreationSuccess,
    subjectCreationError,
    subjectEditingStart,
    subjectEditingSuccess,
    subjectEditingError,
    subjectDeletingStart,
    subjectDeletingSuccess,
    subjectDeletingError
}

export default actions;