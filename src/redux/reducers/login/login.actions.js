import actionTypes from './login.actionTypes'

const loginInStart = () => ({
    type: actionTypes.LOGIN_IN_START
})

const loginInSuccess = (token) => ({
    type: actionTypes.LOGIN_IN_SUCCESS,
    payload: token
})

const loginInError = () => ({
    type: actionTypes.LOGIN_IN_ERROR,
})

const loginOut = () => ({
    type: actionTypes.LOGIN_OUT
})

const actions = {
    loginInStart,
    loginInSuccess,
    loginInError,
    loginOut,
}

export default actions;