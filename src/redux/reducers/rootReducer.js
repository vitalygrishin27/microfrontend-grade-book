import {combineReducers} from "redux";
import userReducer from "./user/user.reducer";
import loginReducer from "./login/login.reducer";
import subjectReducer from "./subject/subject.reducer";
import commonReducer from "./common/common.reducer";
import clazzReducer from "./clazz/clazz.reducer";
import schedulerReducer from "./scheduler/scheduler.reducer";
import fullSchedulerReducer from "./fullScheduler/fullScheduler.reducer";

const rootReducer = () =>
    combineReducers({
        common: commonReducer,
        login: loginReducer,
        users: userReducer,
        subjects: subjectReducer,
        classes: clazzReducer,
        scheduler: schedulerReducer,
        fullScheduler: fullSchedulerReducer,
    });

export default rootReducer;