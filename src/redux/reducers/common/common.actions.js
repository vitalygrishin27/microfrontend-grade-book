import actionTypes from './common.actionTypes'

const setToastShowing = (flag) => ({
    type: actionTypes.CHANGE_TOAST_SHOWING,
    payload: flag
})

const setCommonError = (error) => ({
    type: actionTypes.SET_COMMON_ERROR,
    payload: error
})

const setCommonMessage = (message) => ({
    type: actionTypes.SET_COMMON_MESSAGE,
    payload: message
})

const getVersionStart = () => ({
    type: actionTypes.GET_VERSION_START
})

const getVersionSuccess = (version) => ({
    type: actionTypes.GET_VERSION_SUCCESS,
    payload: version
})

const getVersionError = (error) => ({
    type: actionTypes.GET_VERSION_ERROR,
    payload: error

})

const actions = {
    setToastShowing,
    setCommonError,
    setCommonMessage,
    getVersionStart,
    getVersionSuccess,
    getVersionError
}

export default actions;