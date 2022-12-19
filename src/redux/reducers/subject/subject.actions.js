import actionTypes from './subject.actionTypes'

const subjectListLoadingStart = () => ({
    type: actionTypes.SUBJECT_LIST_LOADING_START
})

const subjectListLoadingSuccess = (subjectList) => ({
    type: actionTypes.SUBJECT_LIST_LOADING_SUCCESS,
    payload: subjectList
})

const subjectListLoadingError = () => ({
    type: actionTypes.SUBJECT_LIST_LOADING_ERROR,
})

const subjectCreationStart = () => ({
    type: actionTypes.SUBJECT_CREATION_START
})

const subjectCreationSuccess = (newSubject) => ({
    type: actionTypes.SUBJECT_CREATION_SUCCESS,
    payload: newSubject
})

const subjectCreationError = () => ({
    type: actionTypes.SUBJECT_CREATION_ERROR,
})

const subjectEditingStart = () => ({
    type: actionTypes.SUBJECT_EDITING_START
})

const subjectEditingSuccess = (updatedSubject) => ({
    type: actionTypes.SUBJECT_EDITING_SUCCESS,
    payload: updatedSubject
})

const subjectEditingError = () => ({
    type: actionTypes.SUBJECT_EDITING_ERROR,
})

const subjectDeletingStart = () => ({
    type: actionTypes.SUBJECT_DELETING_START
})

const subjectDeletingSuccess = (subject) => ({
    type: actionTypes.SUBJECT_DELETING_SUCCESS,
    payload: subject
})

const subjectDeletingError = () => ({
    type: actionTypes.SUBJECT_DELETING_ERROR,
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