import actionTypes from './login.actionTypes'

const loginInStart = () => ({
    type: actionTypes.LOGIN_IN_START
})

const loginInSuccess = (token) => ({
    type: actionTypes.LOGIN_IN_SUCCESS,
    payload: token
})

const loginInError = (error) => ({
    type: actionTypes.LOGIN_IN_ERROR,
    payload: error

})
const setToastShowing = (flag) => ({
    type: actionTypes.CHANGE_TOAST_SHOWING,
    payload: flag
})
const loginOut = () => ({
    type: actionTypes.LOGIN_OUT
})

const actions = {
    loginInStart,
    loginInSuccess,
    loginInError,
    setToastShowing,
    loginOut,
}

export default actions;