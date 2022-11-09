import actionTypes from './user.actionTypes'

const userListLoadingStart = () => ({
    type: actionTypes.USER_LIST_LOADING_START
})

const userListLoadingSuccess = (userList) => ({
    type: actionTypes.USER_LIST_LOADING_SUCCESS,
    payload: userList
})

const userListLoadingError = (error) => ({
    type: actionTypes.USER_LIST_LOADING_ERROR,
    payload: error

})

const userAccessLevelsLoadingStart = () => ({
    type: actionTypes.USER_ACCESS_LEVELS_LOADING_START
})

const userAccessLevelsLoadingSuccess = (accessLevels) => ({
    type: actionTypes.USER_ACCESS_LEVELS_LOADING_SUCCESS,
    payload: accessLevels
})

const userAccessLevelsLoadingError = (error) => ({
    type: actionTypes.USER_ACCESS_LEVELS_LOADING_ERROR,
    payload: error

})

const userCreationStart = () => ({
    type: actionTypes.USER_CREATION_START
})

const userCreationSuccess = (newUser) => ({
    type: actionTypes.USER_CREATION_SUCCESS,
    payload: newUser
})

const userCreationError = (error) => ({
    type: actionTypes.USER_CREATION_ERROR,
    payload: error

})

const userEditingStart = () => ({
    type: actionTypes.USER_EDITING_START
})

const userEditingSuccess = (updatedUser) => ({
    type: actionTypes.USER_EDITING_SUCCESS,
    payload: updatedUser
})

const userEditingError = (error) => ({
    type: actionTypes.USER_EDITING_ERROR,
    payload: error

})

const userDeletingStart = () => ({
    type: actionTypes.USER_DELETING_START
})

const userDeletingSuccess = (user) => ({
    type: actionTypes.USER_DELETING_SUCCESS,
    payload: user
})

const userDeletingError = (error) => ({
    type: actionTypes.USER_DELETING_ERROR,
    payload: error

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