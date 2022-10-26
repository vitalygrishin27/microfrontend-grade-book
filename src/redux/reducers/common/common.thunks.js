import actions from "./common.actions"

export const setToastShowing = (flag) => (dispatch) => {
    dispatch(actions.setToastShowing(flag))
};