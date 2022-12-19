import actionTypes from './user.actionTypes'

const userListLoadingStart = () => ({
    type: actionTypes.USER_LIST_LOADING_START
})

const userListLoadingSuccess = (userList) => ({
    type: actionTypes.USER_LIST_LOADING_SUCCESS,
    payload: userList
})

const userListLoadingError = () => ({
    type: actionTypes.USER_LIST_LOADING_ERROR,
})

const userAccessLevelsLoadingStart = () => ({
    type: actionTypes.USER_ACCESS_LEVELS_LOADING_START
})

const userAccessLevelsLoadingSuccess = (accessLevels) => ({
    type: actionTypes.USER_ACCESS_LEVELS_LOADING_SUCCESS,
    payload: accessLevels
})

const userAccessLevelsLoadingError = () => ({
    type: actionTypes.USER_ACCESS_LEVELS_LOADING_ERROR,
})

const userCreationStart = () => ({
    type: actionTypes.USER_CREATION_START
})

const userCreationSuccess = (newUser) => ({
    type: actionTypes.USER_CREATION_SUCCESS,
    payload: newUser
})

const userCreationError = () => ({
    type: actionTypes.USER_CREATION_ERROR,
})

const userEditingStart = () => ({
    type: actionTypes.USER_EDITING_START
})

const userEditingSuccess = (updatedUser) => ({
    type: actionTypes.USER_EDITING_SUCCESS,
    payload: updatedUser
})

const userEditingError = () => ({
    type: actionTypes.USER_EDITING_ERROR,
})

const userDeletingStart = () => ({
    type: actionTypes.USER_DELETING_START
})

const userDeletingSuccess = (user) => ({
    type: actionTypes.USER_DELETING_SUCCESS,
    payload: user
})

const userDeletingError = () => ({
    type: actionTypes.USER_DELETING_ERROR,
})

const actions = {
    userListLoadingStart,
    userListLoadingSuccess,
    userListLoadingError,
    userAccessLevelsLoadingStart,
    userAccessLevelsLoadingSuccess,
    userAccessLevelsLoadingError,
    userCreationStart,
    userCreationSuccess,
    userCreationError,
    userEditingStart,
    userEditingSuccess,
    userEditingError,
    userDeletingStart,
    userDeletingSuccess,
    userDeletingError
}

export default actions;