import {combineReducers} from "redux";
import userReducer from "./user/user.reducer";
import loginReducer from "./login/login.reducer";
import subjectReducer from "./subject/subject.reducer";
import commonReducer from "./common/common.reducer";

const rootReducer = () =>
    combineReducers({
        common: commonReducer,
        login: loginReducer,
        users: userReducer,
        subjects: subjectReducer
    });

export default rootReducer;