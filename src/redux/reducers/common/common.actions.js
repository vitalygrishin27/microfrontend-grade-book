import actionTypes from './common.actionTypes'

const setToastShowing = (flag) => ({
    type: actionTypes.CHANGE_TOAST_SHOWING,
    payload: flag
})

const setError = (error) => ({
    type: actionTypes.SET_ERROR,
    payload: error
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
    setError,
    getVersionStart,
    getVersionSuccess,
    getVersionError
}

export default actions;