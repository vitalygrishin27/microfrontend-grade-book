import actionTypes from './clazz.actionTypes'

const clazzListLoadingStart = () => ({
    type: actionTypes.CLAZZ_LIST_LOADING_START
})

const clazzListLoadingSuccess = (clazzList) => ({
    type: actionTypes.CLAZZ_LIST_LOADING_SUCCESS,
    payload: clazzList
})

const clazzListLoadingError = (error) => ({
    type: actionTypes.CLAZZ_LIST_LOADING_ERROR,
    payload: error

})

const clazzCreationStart = () => ({
    type: actionTypes.CLAZZ_CREATION_START
})

const clazzCreationSuccess = (newClazz) => ({
    type: actionTypes.CLAZZ_CREATION_SUCCESS,
    payload: newClazz
})

const clazzCreationError = (error) => ({
    type: actionTypes.CLAZZ_CREATION_ERROR,
    payload: error

})

const clazzEditingStart = () => ({
    type: actionTypes.CLAZZ_EDITING_START
})

const clazzEditingSuccess = (updatedClazz) => ({
    type: actionTypes.CLAZZ_EDITING_SUCCESS,
    payload: updatedClazz
})

const clazzEditingError = (error) => ({
    type: actionTypes.CLAZZ_EDITING_ERROR,
    payload: error

})

const clazzDeletingStart = () => ({
    type: actionTypes.CLAZZ_DELETING_START
})

const clazzDeletingSuccess = (clazz) => ({
    type: actionTypes.CLAZZ_DELETING_SUCCESS,
    payload: clazz
})

const clazzDeletingError = (error) => ({
    type: actionTypes.CLAZZ_DELETING_ERROR,
    payload: error

})

const actions = {
    clazzListLoadingStart,
    clazzListLoadingSuccess,
    clazzListLoadingError,
    clazzCreationStart,
    clazzCreationSuccess,
    clazzCreationError,
    clazzEditingStart,
    clazzEditingSuccess,
    clazzEditingError,
    clazzDeletingStart,
    clazzDeletingSuccess,
    clazzDeletingError
}

export default actions;