import actionTypes from './common.actionTypes'

const setToastShowing = (flag) => ({
    type: actionTypes.CHANGE_TOAST_SHOWING,
    payload: flag
})

const actions = {
    setToastShowing
}

export default actions;