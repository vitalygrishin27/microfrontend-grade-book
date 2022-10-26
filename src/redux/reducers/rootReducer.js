import {combineReducers} from "redux";
import userReducer from "./user/user.reducer";
import loginReducer from "./login/login.reducer";

const rootReducer = () =>
    combineReducers({
        login: loginReducer,
        users: userReducer
    });

export default rootReducer;