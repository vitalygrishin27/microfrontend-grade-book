import initialState from "./user.initialStates"

const userReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        default:
            return state;
    }
};

export default userReducer;